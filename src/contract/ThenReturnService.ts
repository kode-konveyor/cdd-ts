import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { THEN_RETURN } from "./Constants.js";
import { ThrowIfCalledWithMissingForService } from "./ThrowIfCalledWithMissingForService.js";

export class ThenReturnService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingForService
      .prototype.throwIfCalledWithMissingFor
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
