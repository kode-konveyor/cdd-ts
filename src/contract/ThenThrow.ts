import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { ThrowIfCalledWithMissingFor } from "./ThrowIfCalledWithMissingFor.js";

export class ThenThrow<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingFor.prototype
      .throwIfCalledWithMissingFor
  ) {
    super();
  }

  thenThrow<THIS extends ContractEntity<T>>(
    explanation: string,
    expectedRegex: string | RegExp
  ): THIS {
    if (this.currentRun == null) this.throwIfCalledWithMissingFor("thenThrow");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.explanation = explanation;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.thrown = expectedRegex;
    return this as unknown as THIS;
  }
}
