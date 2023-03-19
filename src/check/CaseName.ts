import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { RUN_IDENTIFIER_FORMAT } from "./Messages.js";

export function caseName<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS
): string {
    return messageFormat(
        RUN_IDENTIFIER_FORMAT,
        this.explanation,
        this.checkedCase,
        this.currentRunExplanation);
}
