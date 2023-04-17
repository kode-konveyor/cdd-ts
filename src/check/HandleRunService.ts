import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { CaseNameService } from "./CaseNameService.js";
import { SetUpSideEffectChecksService } from "./SetUpSideEffectChecksService.js";
import { TearDownSideEffectChecksService } from "./TearDownSideEffectChecksService.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT } from "./Messages.js";
import { CheckReturnValueService } from "./CheckReturnValueService.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";
import { HandleExceptionService } from "./HandleExceptionService.js";
import { OneSideEffectCheckService } from "./OneSideEffectCheckService.js";
import { RunSideEffectChecksService } from "./RunSideEffectChecksService.js";
import { RunReturnValueChecksService } from "./RunReturnValueChecksService.js";

export class HandleRunService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly handleException = HandleExceptionService.prototype.handleException,
    readonly caseName = CaseNameService.prototype.caseName,
    readonly oneSideEffectCheck = OneSideEffectCheckService.prototype
      .oneSideEffectCheck,
    readonly runSideEffectChecks = RunSideEffectChecksService.prototype
      .runSideEffectChecks,
    readonly runReturnValueChecks = RunReturnValueChecksService.prototype
      .runReturnValueChecks,
    readonly checkReturnValue = CheckReturnValueService.prototype
      .checkReturnValue,
    readonly setUpSideEffectChecksService = SetUpSideEffectChecksService
      .prototype.setUpSideEffectChecks,
    readonly tearDownSideEffectChecksService = TearDownSideEffectChecksService
      .prototype.tearDownSideEffectChecks
  ) {
    super();
  }

  async handleRun(currentRun: RunDescriptorEntity<T>, sut: T): Promise<number> {
    this.currentRunExplanation = currentRun.explanation;
    if (currentRun.parameterGetters === undefined)
      throw new Error(this.caseName() + ": no ifcalledWith");
    try {
      await this.setUpSideEffectChecksService(currentRun);
      let result: ReturnType<T>;
      const parameters: Parameters<T> = getParametersFromGetters(
        currentRun.parameterGetters
      ) as Parameters<T>;
      try {
        result = await sut(...parameters);
      } catch (e) {
        this.tearDownSideEffectChecksService(currentRun);
        this.handleException(currentRun, e);
        return 1;
      }
      if (currentRun.thrown != null)
        throw new Error(
          messageFormat(
            EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
            this.caseName()
          )
        );
      await this.checkReturnValue(currentRun, result);
      this.runReturnValueChecks(currentRun, result, parameters);
      this.runSideEffectChecks(currentRun);
    } catch (e) {
      this.tearDownSideEffectChecksService(currentRun);
      throw e;
    }
    this.tearDownSideEffectChecksService(currentRun);
    return 1;
  }
}
