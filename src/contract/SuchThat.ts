import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type ReturnValueCheckType } from "../types/ReturnValueCheckType.js";
import { ThrowIfCalledWithMissingFor } from "./ThrowIfCalledWithMissingFor.js";

const SUCH_THAT = "suchThat";
export class SuchThat<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingFor.prototype
      .throwIfCalledWithMissingFor
  ) {
    super();
  }

  suchThat<R extends ContractEntity<T>, C extends ReturnValueCheckType<T>>(
    explanation: string,
    checker: C
  ): R {
    this.currentRun?.returnValueChecks.push([explanation, checker]) ??
      this.throwIfCalledWithMissingFor(SUCH_THAT);
    return this as unknown as R;
  }
}
