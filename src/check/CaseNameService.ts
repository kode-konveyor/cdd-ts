import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { RUN_IDENTIFIER_FORMAT } from "./Messages.js";

export class CaseNameService<T extends MethodType> extends ContractEntity<T> {
  caseName(): string {
    return messageFormat(
      RUN_IDENTIFIER_FORMAT,
      String(this.explanation),
      this.checkedCase,
      this.currentRunExplanation
    );
  }
}
