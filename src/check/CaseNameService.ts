import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { RUN_IDENTIFIER_FORMAT } from "./Messages.js";

export class CaseNameService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  caseName(): string {
    return this.messageFormat(
      RUN_IDENTIFIER_FORMAT,
      String(this.explanation),
      this.checkedCase,
      this.currentRunExplanation
    );
  }
}
