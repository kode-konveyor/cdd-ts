import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { caseName } from "./CaseName.js";
import { runSideEffectChecks } from "./RunSideEffectChecks.js";
import { runReturnValueChecks } from "./RunReturnValueChecks.js";
import { handleException } from "./HandleException.js";
import { setUpSideEffectChecks } from "./SetUpSideEffectChecks.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT } from "./Messages.js";
import { checkReturnValue } from "./CheckReturnValue.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";

export function handleRun<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): number {
    this.currentRunExplanation = currentRun.explanation;
    if (currentRun.parameterGetters === undefined)
        throw new Error(caseName.call(this) + ": no ifcalledWith");
    setUpSideEffectChecks.call(this, currentRun);
    let result: ReturnType<T>;
    const parameters: Parameters<T> = getParametersFromGetters(currentRun.parameterGetters) as Parameters<T>
    try {
        result = this.testedFunction(...(parameters));
    } catch (e) {
        handleException.call(this, currentRun, e);
        return 1;
    }
    if (currentRun.thrown != null)
        throw new Error(messageFormat(
            EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
            caseName.call(this)));
    checkReturnValue.call(this, currentRun, result)
    runReturnValueChecks.call(this, currentRun, result, parameters);
    runSideEffectChecks.call(this, currentRun);
    return 1;
}
