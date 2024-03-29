import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseNameService } from "./CaseNameService.js";
import { OneSideEffectCheckService } from "./OneSideEffectCheckService.js";
import { type PromisedReturnType } from "../types/PromisedReturnType.js";

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

  async runSideEffectChecks(
    currentRun: RunDescriptorEntity<T>,
    result: PromisedReturnType<T>,
    parameters: Parameters<T>
  ): Promise<void> {
    for (const [name, checker] of currentRun.sideEffectChecks) {
      await this.oneSideEffectCheck(name, checker, result, parameters);
    }
  }
}
