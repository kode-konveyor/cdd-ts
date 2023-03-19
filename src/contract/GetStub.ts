import equal from "fast-deep-equal"
import { ContractEntity } from "../types/ContractEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { MethodType } from "../types/MethodType.js";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";

export class GetStub {
    getStub<T extends MethodType>(
        contract: ContractEntity<T>,
        caseName?: string
    ): T {
        if (caseName == null)
            caseName = ""
        if (contract.currentRun != null) {
            const currentCase = (contract.currentCase != null) ? contract.currentCase : "";
            contract.cases[currentCase].runs.push(contract.currentRun)
        }

        const currentCase = contract.cases[caseName];

        const stub = (...params: Parameters<T>): ReturnType<T> => {
            const retvals: Array<ReturnType<T>> = []
            currentCase.runs.forEach(run => {
                if (run.parameterGetters == null)
                    throw new Error(messageFormat(
                        "A run in the case '{1}' have no parameters defined!",
                        // made sure that it is not null as the first thing. TS forgot that here
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        caseName!))

                const parameters: Parameters<T> = getParametersFromGetters(run.parameterGetters) as Parameters<T>
                if (equal(parameters, params))
                    if (run.thrown === undefined)
                        retvals.push(run.returnValueGetter as ReturnType<T>)
                    else
                        throw new Error(String(run.thrown))
            })
            if (retvals.length !== 1) {
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
}