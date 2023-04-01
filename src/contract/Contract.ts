import { MeanWhile } from "./Meanwhile.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { GetStub } from "./GetStub.js";
import { SetTitle } from "./SetTitle.js";
import { Check } from "../check/Check.js";
import { IfCalledWith } from "./IfCalledWith.js";
import { CheckCurrentRun } from "./CheckCurrentRun.js";
import { When } from "./When.js";
import { ThenReturn } from "./ThenReturn.js";
import { ThenThrow } from "./ThenThrow.js";
import { SuchThat } from "./SuchThat.js";
import { HandleRun } from "../check/HandleRun.js";
import { HandleException } from "../check/HandleException.js";
import { CaseName } from "../check/CaseName.js";
import { OneSideEffectCheck } from "../check/OneSideEffectCheck.js";
import { RunSideEffectChecks } from "../check/RunSideEffectChecks.js";
import { RunReturnValueChecks } from "../check/RunReturnValueChecks.js";
import { CheckReturnValue } from "../check/CheckReturnValue.js";
import { GetStubForMixin } from "./GetStubForMixin.js";
import { WithParameterConstraints } from "./WithParameterConstraints.js";

type SuchThatType<T extends MethodType> = (explanation: string, checker: (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void) => Contract<T>;

export class Contract<T extends MethodType> extends ContractEntity<T>  {
    
    constructor(
        readonly ifCalledWith: typeof IfCalledWith.prototype.ifCalledWith<Contract<T>> = IfCalledWith.prototype.ifCalledWith,
        private readonly checkCurrentRun = CheckCurrentRun.prototype.checkCurrentRun,
        readonly setTitle: typeof SetTitle.prototype.setTitle<Contract<T>>  = SetTitle.prototype.setTitle,
        readonly when: typeof When.prototype.when<Contract<T>>  = When.prototype.when,
        readonly thenReturn: typeof ThenReturn.prototype.thenReturn<Contract<T>>  = ThenReturn.prototype.thenReturn,
        readonly thenThrow: typeof ThenThrow.prototype.thenThrow<Contract<T>>  = ThenThrow.prototype.thenThrow,
        readonly suchThat: SuchThatType<T>  = SuchThat.prototype.suchThat as SuchThatType<T>,
        readonly withParameterConstraints: typeof WithParameterConstraints.prototype.withParameterConstraints<Contract<T>>  = WithParameterConstraints.prototype.withParameterConstraints,
        readonly meanwhile: typeof MeanWhile.prototype.meanwhile<Contract<T>>  = MeanWhile.prototype.meanwhile,
        readonly getStub: typeof GetStub.prototype.getStub  = GetStub.prototype.getStub,
        readonly check: typeof Check.prototype.check  = Check.prototype.check,
        readonly getStubForMixin = GetStubForMixin.prototype.getStubForMixin,
        private readonly handleRun =  HandleRun.prototype.handleRun,
        private readonly handleException = HandleException.prototype.handleException,
        private readonly caseName = CaseName.prototype.caseName,
        private readonly oneSideEffectCheck = OneSideEffectCheck.prototype.oneSideEffectCheck,
        private readonly runSideEffectChecks = RunSideEffectChecks.prototype.runSideEffectChecks,
        private readonly runReturnValueChecks = RunReturnValueChecks.prototype.runReturnValueChecks,
        private readonly checkReturnValue = CheckReturnValue.prototype.checkReturnValue,
    ) {
        super();
    }

}

