import equal from "fast-deep-equal"
import { ContractEntity } from "../types/ContractEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { MethodType } from "../types/MethodType.js";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";

export class GetStub {
    getStub<T extends MethodType>(
        this: ContractEntity<T>,
        caseName?: string
    ): T {
        if (caseName == null)
            caseName = ""
        if (this.currentRun != null) {
            const currentCase = (this.currentCase != null) ? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }

        const currentCase = this.cases[caseName];

        const stub = (...params: Parameters<T>): ReturnType<T> => {
            console.log("stub called with ", params)
            const retvals: Array<ReturnType<T>> = []
            currentCase.runs.forEach(run => {
                if (run.parameterGetters == null)
                    throw new Error(messageFormat(
                        "A run in the case '{1}' have no parameters defined!",
                        // made sure that it is not null as the first thing. TS forgot that here
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        caseName!))

                const parameters: Parameters<T> = getParametersFromGetters(run.parameterGetters) as Parameters<T>
                console.log("checking ", parameters)
                if (equal(parameters, params))
                    if (run.thrown === undefined)
                        retvals.push(run.returnValueGetter as ReturnType<T>)
                    else
                        throw new Error(String(run.thrown))
            })
            if (retvals.length !== 1) {
                console.log("this=",this)
                throw new Error(messageFormat(
                    MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT,
                    params.toString(),
                    retvals.length.toString()))
            }
            console.log("stub returns", retvals[0])
            return retvals[0]()
        }
        return stub as T;
    }
}