import equal from "fast-deep-equal"
import { ContractEntity } from "../types/ContractEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { MethodType } from "../types/MethodType.js";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";
import { CaseName } from "../check/CaseName.js";
import { CheckCurrentRun } from "./CheckCurrentRun.js";

export class GetStub<T extends MethodType> extends ContractEntity<T> {
    constructor(
        public checkCurrentRun= CheckCurrentRun.prototype.checkCurrentRun,
        
        public caseName = CaseName.prototype.caseName,
    ) {
        super();
    }

    getStub(
        caseName?: string
    ): T {
        this.checkCurrentRun()
        if (caseName == null)
            caseName = ""
        const currentCase = this.cases[caseName];

        const stub = (...params: Parameters<T>): ReturnType<T> => {
            const retvals: Array<ReturnType<T>> = []
            currentCase.runs.forEach(run => {
                if (run.parameterGetters == null)
                    throw new Error(messageFormat(
                        "A run in the case '{1}' have no parameters defined!",
                        // made sure that it is not null as the first thing. TS forgot that here
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        String(caseName)))
                if(run.returnValueChecks.length > 0 || equal(getParametersFromGetters(run.parameterGetters), params)) {
                    if (run.thrown === undefined)
                        retvals.push(run.returnValueGetter as ReturnType<T>)
                    else
                        throw new Error(String(run.thrown))
                }
            })
            if (retvals.length !== 1) {
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