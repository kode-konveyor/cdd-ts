import { MeanWhileService } from "./MeanWhileService.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { GetStubService } from "./GetStubService.js";
import { SetTitleService } from "./SetTitleService.js";
import { CheckService } from "../check/CheckService.js";
import { IfCalledWithService } from "./IfCalledWithService.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { WhenService } from "./WhenService.js";
import { ThenReturnService } from "./ThenReturnService.js";
import { ThenThrowService } from "./ThenThrowService.js";
import { SuchThatService } from "./SuchThatService.js";
import { HandleRunService } from "../check/HandleRunService.js";
import { HandleExceptionService } from "../check/HandleExceptionService.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { OneSideEffectCheckService } from "../check/OneSideEffectCheckService.js";
import { RunSideEffectChecksService } from "../check/RunSideEffectChecksService.js";
import { RunReturnValueChecksService } from "../check/RunReturnValueChecksService.js";
import { CheckReturnValueService } from "../check/CheckReturnValueService.js";
import { GetStubForMixinService } from "./GetStubForMixinService.js";
import { type ReturnValueCheckType } from "../types/ReturnValueCheckType.js";
import { SetUpSideEffectChecksService } from "../check/SetUpSideEffectChecksService.js";
import { TearDownSideEffectChecksService } from "../check/TearDownSideEffectChecksService.js";
import { DiffService } from "../util/DiffService.js";
import { GetParametersFromGettersService } from "../util/GetParametersFromGettersService.js";
import { MessageFormatService } from "../util/messageFormat.js";

export class Contract<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly ifCalledWith: typeof IfCalledWithService.prototype.ifCalledWith<
      Contract<T>
    > = IfCalledWithService.prototype.ifCalledWith,
    private readonly checkCurrentRun: typeof CheckCurrentRunService.prototype.checkCurrentRun<T> = CheckCurrentRunService
      .prototype.checkCurrentRun,
    readonly setTitle: typeof SetTitleService.prototype.setTitle<
      Contract<T>
    > = SetTitleService.prototype.setTitle,
    readonly when: typeof WhenService.prototype.when<Contract<T>> = WhenService
      .prototype.when,
    readonly thenReturn: typeof ThenReturnService.prototype.thenReturn<
      Contract<T>
    > = ThenReturnService.prototype.thenReturn,
    readonly thenThrow: typeof ThenThrowService.prototype.thenThrow<
      Contract<T>
    > = ThenThrowService.prototype.thenThrow,
    readonly suchThat: typeof SuchThatService.prototype.suchThat<
      Contract<T>,
      ReturnValueCheckType<T>
    > = SuchThatService.prototype.suchThat,
    readonly meanwhile: typeof MeanWhileService.prototype.meanWhile<
      Contract<T>
    > = MeanWhileService.prototype.meanWhile,
    readonly getStub: typeof GetStubService.prototype.getStub = GetStubService
      .prototype.getStub,
    readonly check: typeof CheckService.prototype.check = CheckService.prototype
      .check,
    readonly getStubForMixin = GetStubForMixinService.prototype.getStubForMixin,
    private readonly handleRun = HandleRunService.prototype.handleRun,
    private readonly handleException = HandleExceptionService.prototype
      .handleException,
    private readonly caseName = CaseNameService.prototype.caseName,
    private readonly oneSideEffectCheck = OneSideEffectCheckService.prototype
      .oneSideEffectCheck,
    private readonly runSideEffectChecks = RunSideEffectChecksService.prototype
      .runSideEffectChecks,
    private readonly runReturnValueChecks = RunReturnValueChecksService
      .prototype.runReturnValueChecks,
    private readonly checkReturnValue = CheckReturnValueService.prototype
      .checkReturnValue,
    private readonly setUpSideEffectChecksService = SetUpSideEffectChecksService
      .prototype.setUpSideEffectChecks,
    private readonly tearDownSideEffectChecksService = TearDownSideEffectChecksService
      .prototype.tearDownSideEffectChecks,
    private readonly diff = DiffService.prototype.diff,
    private readonly getParametersFromGetters = GetParametersFromGettersService
      .prototype.getParametersFromGetters,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }
}
