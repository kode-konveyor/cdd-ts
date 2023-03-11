import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { messageFormat } from "../util/messageFormat";
import { RUN_IDENTIFIER_FORMAT } from "./Messages";

export function caseName<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS
    ): string {
    return messageFormat(
        RUN_IDENTIFIER_FORMAT,
        this.explanation,
        this.checkedCase,
        this.currentRunExplanation);
}
