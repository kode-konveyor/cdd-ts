import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { RUN_IDENTIFIER_FORMAT } from "./Messages.js";

export class CaseName<T extends MethodType> extends ContractEntity<T> {
    caseName(): string {
        return messageFormat(
            RUN_IDENTIFIER_FORMAT,
            String(this.explanation),
            this.checkedCase,
            this.currentRunExplanation);
    }
}