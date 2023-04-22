import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { THEN_THROW } from "./Constants.js";
import { type ThenThrowResultType } from "../types/ThenThrowResultType.js";
import { ThrowIfCalledWithMissingForService } from "./ThrowIfCalledWithMissingForService.js";

export class ThenThrowService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingForService
      .prototype.throwIfCalledWithMissingFor,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  thenThrow(
    explanation: string,
    expectedRegex: string | RegExp
  ): ThenThrowResultType<T> {
    if (this.currentRun == null) this.throwIfCalledWithMissingFor(THEN_THROW);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.explanation = explanation;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.currentRun!.thrown = expectedRegex;
    return this as unknown as ThenThrowResultType<T>;
  }
}
