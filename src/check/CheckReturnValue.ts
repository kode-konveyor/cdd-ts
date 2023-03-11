import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { RETURN_VALUE_MISMATCH_MESSAGE_FORMAT } from "./Messages";

export function checkReturnValue<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>,
    result: ReturnType<T>
): void {
    const expected = JSON.stringify(currentRun.returnValue);
    const actual = JSON.stringify(result);
    if (actual !== expected)
        throw new Error(messageFormat(
            RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
            caseName.apply(this),
            expected,
            actual));
}
