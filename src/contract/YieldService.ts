import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { type ReturnValueGetterType } from "../types/ReturnValueGetterType.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { YIELD } from "./Constants.js";
import { ThrowIfCalledWithMissingForService } from "./ThrowIfCalledWithMissingForService.js";

export class YieldService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingForService
      .prototype.throwIfCalledWithMissingFor,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  yield<I extends ParameterGetters<T>, O extends ReturnValueGetterType<T>>(
    paramgetters: I,
    returngetter: O
  ): this {
    if (this.currentRun == null) this.throwIfCalledWithMissingFor(YIELD);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.parameterGetters = paramgetters;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.returnValueGetter = returngetter;
    return this;
  }
}
