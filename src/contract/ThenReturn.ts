import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { ThrowIfCalledWithMissingFor } from "./ThrowIfCalledWithMissingFor.js";

const THEN_RETURN = "thenReturn";
export class ThenReturn<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingFor.prototype
      .throwIfCalledWithMissingFor
  ) {
    super();
  }

  thenReturn<THIS extends ContractEntity<T>>(
    explanation: string,
    returnValue: () => ReturnType<T>
  ): THIS {
    if (this.currentRun == null) this.throwIfCalledWithMissingFor(THEN_RETURN);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.explanation = explanation;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.returnValueGetter = returnValue;
    return this as unknown as THIS;
  }
}
