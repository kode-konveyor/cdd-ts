import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type ReturnValueCheckType } from "../types/ReturnValueCheckType.js";
import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { THEN_RETURN } from "./Constants.js";
import { type ThenreturnResultType } from "../types/ThenreturnResultType.js";
import { ThrowIfCalledWithMissingForService } from "./ThrowIfCalledWithMissingForService.js";

export class ThenReturnService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingForService
      .prototype.throwIfCalledWithMissingFor,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  thenReturn(
    explanation: string,
    returnValue:
      | (() => ReturnType<T>)
      | { default: () => ReturnType<T>; check: ReturnValueCheckType<T> }
  ): ThenreturnResultType<T> {
    if (this.currentRun == null) this.throwIfCalledWithMissingFor(THEN_RETURN);
    const run = this.currentRun as RunDescriptorEntity<T>;
    run.explanation = explanation;
    if ("default" in returnValue) {
      run.returnValueChecks.push(returnValue.check);
      run.returnValueGetter = returnValue.default;
    } else {
      run.returnValueGetter = returnValue;
    }
    return this as unknown as ThenreturnResultType<T>;
  }
}
