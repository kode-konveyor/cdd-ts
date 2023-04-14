import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import {
  NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT,
  UNEXPECTED_EXCEPTION_MESSAGE_FORMAT,
} from "./Messages.js";
import { CaseName } from "./CaseName.js";

export class HandleException<T extends MethodType> extends ContractEntity<T> {
  constructor(readonly caseName = CaseName.prototype.caseName) {
    super();
  }

  handleException(currentRun: RunDescriptorEntity<T>, catched: unknown): void {
    if (currentRun.thrown === undefined) {
      throw new Error(
        messageFormat(
          UNEXPECTED_EXCEPTION_MESSAGE_FORMAT,
          this.caseName(),
          String(catched),
          String((catched as Error).stack)
        )
      );
    }
    if (String(catched).match(currentRun.thrown) == null)
      throw new Error(
        messageFormat(
          NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT,
          this.caseName(),
          String(catched),
          String((catched as Error).stack)
        )
      );
  }
}
