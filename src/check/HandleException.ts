import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT, UNEXPECTED_EXCEPTION_MESSAGE_FORMAT } from "./Messages";

export function handleException<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>,
    catched: unknown
):void {
    if (currentRun.thrown === undefined) {
        throw new Error(messageFormat(
            UNEXPECTED_EXCEPTION_MESSAGE_FORMAT,
            caseName.apply(this),
            String(catched)));
    }
    if (String(catched).match(currentRun.thrown) == null)
        throw new Error(messageFormat(
            NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT,
            caseName.apply(this),
            String(catched)));
}

