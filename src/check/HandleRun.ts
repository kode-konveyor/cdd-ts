import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { runSideEffectChecks } from "./RunSideEffectChecks";
import { runReturnValueChecks } from "./RunReturnValueChecks";
import { handleException } from "./HandleException";
import { setUpSideEffectChecks } from "./SetUpSideEffectChecks";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT } from "./Messages";
import { checkReturnValue } from "./CheckReturnValue";


export function handleRun <T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): number {
    this.currentRunExplanation = currentRun.explanation;
    if (currentRun.parameters === undefined)
        throw new Error(caseName.apply(this) + ": no ifcalledWith");
    setUpSideEffectChecks.apply(this,[currentRun]);
    let result: ReturnType<T>;
    try {
        const parameters: Parameters<T> = currentRun.parameters;
        result = this.testedFunction(...(parameters));
    } catch (e) {
        handleException.apply(this,[currentRun, e]);
        return 1;
    }
    if (currentRun.thrown != null)
        throw new Error(messageFormat(
            EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
            caseName.apply(this)));
    checkReturnValue.call(this,currentRun,result)
    runReturnValueChecks.call(this,currentRun);
    runSideEffectChecks.call(this,currentRun);
    return 1;
}
