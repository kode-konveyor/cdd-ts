import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { runSideEffectChecks } from "./RunSideEffectChecks";
import { runReturnValueChecks } from "./RunReturnValueChecks";
import { checkReturnValue } from "./CheckReturnValue";
import { handleException } from "./HandleException";
import { setUpSideEffectChecks } from "./SetUpSideEffectChecks";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT } from "./Messages";

export function handleRun <T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): number {
    this.currentRunExplanation = currentRun.explanation;
    if (currentRun.parameters === undefined)
        throw new Error(caseName.apply(this) + ": no ifcalledWith");
    setUpSideEffectChecks.apply(this,[currentRun]);
    let result;
    try {
        const parameters: Parameters<T> = currentRun.parameters;
        result = this.testedFunction(...(parameters as any[]));
    } catch (e) {
        handleException.apply(this,[currentRun, e]);
        return 1;
    }
    if (currentRun.thrown != null)
        throw new Error(messageFormat(
            EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
            caseName.apply(this)));
    checkReturnValue.apply(this,[currentRun, result]);
    runReturnValueChecks.apply(this,[currentRun]);
    runSideEffectChecks.apply(this,[currentRun]);
    return 1;
}
