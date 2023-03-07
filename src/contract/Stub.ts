import equal  from "fast-deep-equal"
import { ContractEntity } from "./ContractEntity";
import { messageFormat } from "../util/messageFormat";
import { SutType } from "./SutType";

const MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT = "those parameters are not defined exactly once for this case:\n{1}\n{2}";

export class Stub<T extends SutType> extends ContractEntity<T> {
    stub(caseName?: string): T {
        if (caseName === undefined) 
            caseName = ""
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
    
        const currentCase = this.cases[caseName];

        const stub = (...params: Parameters<T>) =>
        {
            const retvals:ReturnType<T>[] = []
            currentCase.runs.forEach( run => {
                if(equal(run.parameters, params))
                  if(run.thrown === undefined)
                    retvals.push(run.returnValue as ReturnType<T>)
                   else
                     throw new Error(String(run.thrown))
            })
            if(retvals.length != 1)
                throw new Error(messageFormat(
                    MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT,
                    params,
                    retvals.length.toString()))
            return retvals[0]
        }
        return stub as T;
    }
}
