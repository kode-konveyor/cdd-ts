import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { type MethodType } from "../types/MethodType.js";
import { RETURN_VALUE_MISMATCH_MESSAGE_FORMAT } from "./Messages.js";
import { CaseNameService } from "./CaseNameService.js";

import { serialize } from "../util/serialize.js";
import { DiffService } from "../util/DiffService.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { UNDEFINED_AS_STRING, EMPTY_STRING } from "./Constants.js";

export class CheckReturnValueService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    readonly caseName = CaseNameService.prototype.caseName,
    readonly diff = DiffService.prototype.diff
  ) {
    super();
  }

  async checkReturnValue(
    currentRun: RunDescriptorEntity<T>,
    result: ReturnType<T>
  ): Promise<void> {
    this.currentRunExplanation = currentRun.explanation;
    if (currentRun.returnValueChecks.length !== 0) return;
    const actual = serialize(result);
    const returnValueGetter = currentRun.returnValueGetter;
    if (returnValueGetter == null)
      throw new Error(
        messageFormat(
          RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
          this.caseName(),
          UNDEFINED_AS_STRING,
          actual,
          EMPTY_STRING
        )
      );
    const expected = serialize(returnValueGetter());
    if (actual !== expected) {
      throw new Error(
        messageFormat(
          RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
          this.caseName(),
          expected,
          actual,
          this.diff(expected, actual)
        )
      );
    }
  }
}
