import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { type IfCalledWithReturnType } from "../types/IfCalledWithReturnType.js";
import { serialize } from "../util/serialize.js";
import { GetParametersFromGettersService } from "../util/GetParametersFromGettersService.js";
import { PARAMETER_DIDNT_PASS_THE_CHECK } from "./Messages.js";

export class IfCalledWithService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    private readonly checkCurrentRun = CheckCurrentRunService.prototype
      .checkCurrentRun,
    private readonly caseName = CaseNameService.prototype.caseName,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat,
    private readonly getParametersFromGetters = GetParametersFromGettersService
      .prototype.getParametersFromGetters
  ) {
    super();
  }

  ifCalledWith(
    ...parameterGetters:
      | ParameterGetters<T>
      | [
          {
            default: ParameterGetters<T>;
            checker: (...getters: Parameters<T>) => unknown;
          }
        ]
  ): IfCalledWithReturnType<T> {
    this.checkCurrentRun();
    this.currentRun = new RunDescriptorEntity();
    if (0 in parameterGetters && "default" in parameterGetters[0]) {
      const getters = parameterGetters[0].default;
      this.currentRun.parameterGetters = getters;
      const checker = parameterGetters[0].checker;
      this.currentRun.parameterCheck = checker;
      const parameters = this.getParametersFromGetters(
        getters
      ) as Parameters<T>;
      const checkResult = checker(...parameters);
      if (checkResult !== undefined) {
        throw new Error(
          this.messageFormat(
            PARAMETER_DIDNT_PASS_THE_CHECK,
            this.caseName(),
            serialize(checkResult)
          )
        );
      }
    } else {
      this.currentRun.parameterGetters =
        parameterGetters as ParameterGetters<T>;
    }
    return this as unknown as IfCalledWithReturnType<T>;
  }
}
