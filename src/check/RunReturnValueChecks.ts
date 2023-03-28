import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { CaseName } from "./CaseName.js";
import { RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT } from "./Messages.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";

export class RunReturnValueChecks<T extends MethodType> extends ContractEntity<T> {
    constructor(
        readonly caseName = CaseName.prototype.caseName,
    ) {
        super();
    }

    runReturnValueChecks(
        currentRun: RunDescriptorEntity<T>,
        result: ReturnType<T>,
        parameters: Parameters<T>
    ): void {
        currentRun.returnValueChecks.forEach(
            entry => {
                try {
                    const checkResult = entry[1](result, ...(parameters))
                    if(checkResult !== undefined) {
                        // eslint-disable-next-line @typescript-eslint/no-throw-literal
                        throw checkResult
                    }
                } catch (error) {
                    throw new Error(messageFormat(
                        RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT,
                        this.caseName(),
                        entry[0],
                        String(error)));
                }
            }
        );
    }
}
