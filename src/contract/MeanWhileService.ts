import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { MEANWHILE } from "./Constants.js";
import { ThrowIfCalledWithMissingForService } from "./ThrowIfCalledWithMissingForService.js";

export class MeanWhileService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingForService
      .prototype.throwIfCalledWithMissingFor
  ) {
    super();
  }

  meanWhile<THIS extends ContractEntity<T>>(
    reason: string,
    checker: SideEffectCheckerType
  ): THIS {
    this.currentRun?.sideEffectChecks.push([reason, checker]) ??
      this.throwIfCalledWithMissingFor(MEANWHILE);
    return this as unknown as THIS;
  }
}
