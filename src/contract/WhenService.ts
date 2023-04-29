import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type EnvironmentManipulatorType } from "../types/EnvironmentManipulatorType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { type WhenServiceResultType } from "../types/WhenServiceResultType.js";

export class WhenService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    private readonly checkCurrentRun = CheckCurrentRunService.prototype
      .checkCurrentRun,
    private readonly caseName = CaseNameService.prototype.caseName,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  when(
    explanation: string,
    environmentManipulator: EnvironmentManipulatorType
  ): WhenServiceResultType<T> {
    this.checkCurrentRun();
    this.currentCase = explanation;
    const caseDescriptor = new CaseDescriptorEntity();
    caseDescriptor.setUp = environmentManipulator.setUp;
    caseDescriptor.tearDown = environmentManipulator.tearDown;
    this.cases[explanation] = caseDescriptor;
    delete this.currentRun;
    this.currentRun = undefined;
    return this as unknown as WhenServiceResultType<T>;
  }
}
