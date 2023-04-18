import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type ReturnValueCheckType } from "../types/ReturnValueCheckType.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { SUCH_THAT } from "./Constants.js";
import { ThrowIfCalledWithMissingForService } from "./ThrowIfCalledWithMissingForService.js";

export class SuchThatService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingForService
      .prototype.throwIfCalledWithMissingFor,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
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
