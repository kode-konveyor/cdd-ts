import { ContractEntity } from "../contract/ContractEntity";
import { MethodType } from "../contract/MethodType";
import { messageFormat } from "../util/messageFormat";
import { RUN_IDENTIFIER_FORMAT } from "./Messages";

export function caseName<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS
): string {
    return messageFormat(
        RUN_IDENTIFIER_FORMAT,
        this.explanation,
        this.checkedCase,
        this.currentRunExplanation);
}
