import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { CaseName } from "./CaseName.js";
import { setUpSideEffectChecks } from "./SetUpSideEffectChecks.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT } from "./Messages.js";
import { CheckReturnValue } from "./CheckReturnValue.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";
import { HandleException } from "./HandleException.js";
import { OneSideEffectCheck } from "./OneSideEffectCheck.js";
import { RunSideEffectChecks } from "./RunSideEffectChecks.js";
import { RunReturnValueChecks } from "./RunReturnValueChecks.js";

export class HandleRun <T extends MethodType> extends ContractEntity<T> {
    constructor(
        readonly handleException = HandleException.prototype.handleException,
        readonly caseName = CaseName.prototype.caseName,
        readonly oneSideEffectCheck = OneSideEffectCheck.prototype.oneSideEffectCheck,
        readonly runSideEffectChecks = RunSideEffectChecks.prototype.runSideEffectChecks,
        readonly runReturnValueChecks = RunReturnValueChecks.prototype.runReturnValueChecks,
        readonly checkReturnValue = CheckReturnValue.prototype.checkReturnValue,
    ) {
        super();
    }
    
    handleRun(
        currentRun: RunDescriptorEntity<T>
    ): number {
        this.currentRunExplanation = currentRun.explanation;
        if (currentRun.parameterGetters === undefined)
            throw new Error(this.caseName() + ": no ifcalledWith");
        setUpSideEffectChecks.call(this, currentRun);
        let result: ReturnType<T>;
        const parameters: Parameters<T> = getParametersFromGetters(currentRun.parameterGetters) as Parameters<T>
        try {
            result = this.testedFunction(...(parameters));
        } catch (e) {
            this.handleException(currentRun, e);
            return 1;
        }
        if (currentRun.thrown != null)
            throw new Error(messageFormat(
                EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
                this.caseName()));
        this.checkReturnValue(currentRun, result)
        this.runReturnValueChecks(currentRun, result, parameters);
        this.runSideEffectChecks(currentRun);
        return 1;
    }
}