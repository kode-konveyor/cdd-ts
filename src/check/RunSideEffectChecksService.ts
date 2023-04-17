import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseNameService } from "./CaseNameService.js";
import { OneSideEffectCheckService } from "./OneSideEffectCheckService.js";

export class RunSideEffectChecksService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    readonly oneSideEffectCheck = OneSideEffectCheckService.prototype
      .oneSideEffectCheck,
    readonly caseName = CaseNameService.prototype.caseName
  ) {
    super();
  }

  runSideEffectChecks(currentRun: RunDescriptorEntity<T>): void {
    currentRun.sideEffectChecks.forEach(this.oneSideEffectCheck());
  }
}
