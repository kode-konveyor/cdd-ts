import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";

export class IfCalledWithService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    public checkCurrentRun = CheckCurrentRunService.prototype.checkCurrentRun,

    public caseName = CaseNameService.prototype.caseName
  ) {
    super();
  }

  ifCalledWith<R extends ContractEntity<T>>(
    ...parameterGetters: ParameterGetters<T>
  ): R {
    this.checkCurrentRun();
    this.currentRun = new RunDescriptorEntity();
    this.currentRun.parameterGetters = parameterGetters;
    return this as unknown as R;
  }
}
