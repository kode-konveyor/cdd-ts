import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseName } from "../check/CaseName.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { CheckCurrentRun } from "./CheckCurrentRun.js";

export class IfCalledWith<T extends MethodType> extends ContractEntity<T> {
  constructor(
    public checkCurrentRun = CheckCurrentRun.prototype.checkCurrentRun,

    public caseName = CaseName.prototype.caseName
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
