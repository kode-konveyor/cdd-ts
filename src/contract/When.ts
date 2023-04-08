import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { EnvironmentManipulatorType } from "../types/EnvironmentManipulatorType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { CaseName } from "../check/CaseName.js";
import { CheckCurrentRun } from "./CheckCurrentRun.js";

export class When<T extends MethodType> extends ContractEntity<T> {
  constructor(
    public checkCurrentRun = CheckCurrentRun.prototype.checkCurrentRun,
    public caseName = CaseName.prototype.caseName
  ) {
    super();
  }

  when<R extends ContractEntity<T>>(
    explanation: string,
    environmentManipulator: EnvironmentManipulatorType
  ): R {
    this.checkCurrentRun();
    this.currentCase = explanation;
    const caseDescriptor = new CaseDescriptorEntity();
    caseDescriptor.setUp = environmentManipulator.setUp;
    caseDescriptor.tearDown = environmentManipulator.tearDown;
    this.cases[explanation] = caseDescriptor;
    this.currentRun = undefined;
    return this as unknown as R;
  }
}
