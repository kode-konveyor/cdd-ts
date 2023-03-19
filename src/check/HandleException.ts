import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { caseName } from "./CaseName.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT, UNEXPECTED_EXCEPTION_MESSAGE_FORMAT } from "./Messages.js";

export function handleException<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>,
    catched: unknown
): void {
    if (currentRun.thrown === undefined) {
        throw new Error(messageFormat(
            UNEXPECTED_EXCEPTION_MESSAGE_FORMAT,
            caseName.call(this),
            String(catched)));
    }
    if (String(catched).match(currentRun.thrown) == null)
        throw new Error(messageFormat(
            NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT,
            caseName.call(this),
            String(catched)));
}

