import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT } from "./Messages";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { messageFormat } from "../util/messageFormat";

export function runReturnValueChecks<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
    ):void {
    currentRun.returnValueChecks.forEach(
        entry => {
            try {
                entry[1](currentRun.returnValue as ReturnType<T>, ...(currentRun.parameters as Parameters<T>));
            } catch (error) {
                throw new Error(messageFormat(
                    RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT,
                    caseName.apply(this),
                    entry[0],
                    String(error)));
            }
        }
    );
}

