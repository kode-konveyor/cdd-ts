import equal  from "fast-deep-equal"
import { ContractEntity } from "./ContractEntity";
import { messageFormat } from "../util/messageFormat";
import { MethodType } from "./MethodType";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages";
import { ParameterGetters } from "src/contract/ParameterGetters";

export function getStub<T extends MethodType>(
    contract: ContractEntity<T>,
    caseName?: string
): T {
    if (caseName === undefined) 
        caseName = ""
    if(contract.currentRun != null) {
        const currentCase = (contract.currentCase != null)? contract.currentCase : "";
        contract.cases[currentCase].runs.push(contract.currentRun)
    }

    const currentCase = contract.cases[caseName];

    const stub = (...params: Parameters<T>): ReturnType<T> =>
    {
        const retvals:Array<ReturnType<T>> = []
        currentCase.runs.forEach( run => {
            const parameters: Parameters<T> = run.parameterGetters?.map((x: ()=> any) => x()) as Parameters<T>
            if(equal(parameters, params))
                if(run.thrown === undefined)
                retvals.push(run.returnValueGetter as ReturnType<T>)
                else
                    throw new Error(String(run.thrown))
        })
        if(retvals.length !== 1) {
            console.log(contract)
            throw new Error(messageFormat(
                MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT,
                params.toString(),
                retvals.length.toString()))
        }
        return retvals[0]()
    }
    return stub as T;
}
