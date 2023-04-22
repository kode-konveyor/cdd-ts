import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { type ThenReturnOrThenThrowType } from "../types/ThenReturnOrThenThrowType.js";

export class IfCalledWithService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    private readonly checkCurrentRun = CheckCurrentRunService.prototype
      .checkCurrentRun,
    private readonly caseName = CaseNameService.prototype.caseName,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  ifCalledWith(
    ...parameterGetters: ParameterGetters<T>
  ): ThenReturnOrThenThrowType<T> {
    this.checkCurrentRun();
    this.currentRun = new RunDescriptorEntity();
    this.currentRun.parameterGetters = parameterGetters;
    return this as unknown as ThenReturnOrThenThrowType<T>;
  }
}
