import { HandleRunService } from "./HandleRunService.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { CaseNameService } from "./CaseNameService.js";
import { CheckReturnValueService } from "./CheckReturnValueService.js";
import { HandleExceptionService } from "./HandleExceptionService.js";
import { OneSideEffectCheckService } from "./OneSideEffectCheckService.js";
import { RunReturnValueChecksService } from "./RunReturnValueChecksService.js";
import { RunSideEffectChecksService } from "./RunSideEffectChecksService.js";
import { checkServiceMutex, NO_CHECKS_IN_CONTRACT } from "./Constants.js";
import { SetUpSideEffectChecksService } from "./SetUpSideEffectChecksService.js";
import { TearDownSideEffectChecksService } from "./TearDownSideEffectChecksService.js";
import { nullPromise } from "../runner/Constants.js";
import { DiffService } from "../util/DiffService.js";
import { GetParametersFromGettersService } from "../util/GetParametersFromGettersService.js";

export class CheckService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly handleRun = HandleRunService.prototype.handleRun,
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
      .prototype.tearDownSideEffectChecks,
    private readonly diff = DiffService.prototype.diff,
    readonly getParametersFromGetters = GetParametersFromGettersService
      .prototype.getParametersFromGetters
  ) {
    super();
  }

  async check(sut: T): Promise<number> {
    let checked: number = 0;
    if (this.currentRun != null) {
      const currentCase = this.currentCase != null ? this.currentCase : "";
      if (this.cases[currentCase] === undefined) {
        this.cases[currentCase] = new CaseDescriptorEntity();
      }
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      (this.cases[currentCase] as CaseDescriptorEntity<T>).runs.push(
        this.currentRun
      );
      delete this.currentRun;
    }
    for (const casename in this.cases) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const thisCase: CaseDescriptorEntity<T> = this.cases[
        casename
      ] as CaseDescriptorEntity<T>;
      this.checkedCase = casename;
      try {
        if (casename !== "") await checkServiceMutex.lock();
        if (thisCase.setUp != null) {
          await thisCase.setUp();
        }
        checked += await thisCase.runs.reduce(async (prev, current) => {
          const currentResult = await this.handleRun(current, sut);
          const previous = await prev;
          return previous + currentResult;
        }, nullPromise);
        if (thisCase.tearDown != null) {
          thisCase.tearDown();
        }
      } catch (e) {
        if (casename !== "") checkServiceMutex.unlock();
        throw e;
      }
      if (casename !== "") checkServiceMutex.unlock();
    }
    if (checked === 0) {
      throw new Error(messageFormat(NO_CHECKS_IN_CONTRACT, this.explanation));
    }
    return checked;
  }
}
