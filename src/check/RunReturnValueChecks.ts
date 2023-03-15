import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT } from "./Messages";
import { ContractEntity } from "../contract/ContractEntity";
import { MethodType } from "../contract/MethodType";
import { messageFormat } from "../util/messageFormat";

export function runReturnValueChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>,
    result: ReturnType<T>,
    parameters: Parameters<T>
): void {
    currentRun.returnValueChecks.forEach(
        entry => {
            try {
                entry[1](result, ...(parameters));
            } catch (error) {
                throw new Error(messageFormat(
                    RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT,
                    caseName.call(this),
                    entry[0],
                    String(error)));
            }
        }
    );
}

