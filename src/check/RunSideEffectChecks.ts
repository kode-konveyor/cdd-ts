import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseName } from "./CaseName.js";
import { OneSideEffectCheck } from "./OneSideEffectCheck.js";

export class RunSideEffectChecks<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    readonly oneSideEffectCheck = OneSideEffectCheck.prototype
      .oneSideEffectCheck,
    readonly caseName = CaseName.prototype.caseName
  ) {
    super();
  }

  runSideEffectChecks(currentRun: RunDescriptorEntity<T>): void {
    currentRun.sideEffectChecks.forEach(this.oneSideEffectCheck());
  }
}
