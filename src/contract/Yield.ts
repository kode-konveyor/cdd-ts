import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { ParameterGetters } from "../types/ParameterGettersType.js";
import { ReturnValueGetterType } from "../types/ReturnValueGetterType.js";
import { ThrowIfCalledWithMissingFor } from "./ThrowIfCalledWithMissingFor.js";

export class Yield<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingFor.prototype
      .throwIfCalledWithMissingFor
  ) {
    super();
  }

  yield<I extends ParameterGetters<T>, O extends ReturnValueGetterType<T>>(
    paramgetters: I,
    returngetter: O
  ): this {
    if (this.currentRun == null) this.throwIfCalledWithMissingFor("yield");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.parameterGetters = paramgetters;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.returnValueGetter = returngetter;
    return this;
  }
}
