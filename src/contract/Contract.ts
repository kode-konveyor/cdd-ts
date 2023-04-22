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
import { HandleRunService } from "../check/HandleRunService.js";
import { HandleExceptionService } from "../check/HandleExceptionService.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { OneSideEffectCheckService } from "../check/OneSideEffectCheckService.js";
import { RunSideEffectChecksService } from "../check/RunSideEffectChecksService.js";
import { RunReturnValueChecksService } from "../check/RunReturnValueChecksService.js";
import { CheckReturnValueService } from "../check/CheckReturnValueService.js";
import { GetStubForMixinService } from "./GetStubForMixinService.js";
import { SetUpSideEffectChecksService } from "../check/SetUpSideEffectChecksService.js";
import { TearDownSideEffectChecksService } from "../check/TearDownSideEffectChecksService.js";
import { DiffService } from "../util/DiffService.js";
import { GetParametersFromGettersService } from "../util/GetParametersFromGettersService.js";
import { MessageFormatService } from "../util/messageFormat.js";

export class Contract<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly ifCalledWith: IfCalledWithService<T>["ifCalledWith"] = IfCalledWithService
      .prototype.ifCalledWith,
    private readonly checkCurrentRun: CheckCurrentRunService<T>["checkCurrentRun"] = CheckCurrentRunService
      .prototype.checkCurrentRun,
    readonly setTitle: SetTitleService<T>["setTitle"] = SetTitleService
      .prototype.setTitle,
    readonly when: WhenService<T>["when"] = WhenService.prototype.when,
    readonly thenReturn: ThenReturnService<T>["thenReturn"] = ThenReturnService
      .prototype.thenReturn,
    readonly thenThrow: ThenThrowService<T>["thenThrow"] = ThenThrowService
      .prototype.thenThrow,
    readonly meanwhile: MeanWhileService<T>["meanWhile"] = MeanWhileService
      .prototype.meanWhile,
    readonly getStub: GetStubService<T>["getStub"] = GetStubService.prototype
      .getStub,
    readonly check: CheckService<T>["check"] = CheckService.prototype.check,
    // @ts-expect-error functions treated with this will always have at least self as parameter
    readonly getStubForMixin: GetStubForMixinService<T>["getStubForMixin"] = GetStubForMixinService
      .prototype.getStubForMixin,
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
