import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { caseName } from "./CaseName";
import { runSideEffectChecks } from "./RunSideEffectChecks";
import { runReturnValueChecks } from "./RunReturnValueChecks";
import { handleException } from "./HandleException";
import { setUpSideEffectChecks } from "./SetUpSideEffectChecks";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { MethodType } from "../contract/MethodType";
import { EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT } from "./Messages";
import { checkReturnValue } from "./CheckReturnValue";

export function handleRun <T extends MethodType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): number {
    this.currentRunExplanation = currentRun.explanation;
    if (currentRun.parameterGetters === undefined)
        throw new Error(caseName.call(this) + ": no ifcalledWith");
    setUpSideEffectChecks.call(this,currentRun);
    let result: ReturnType<T>;
    const parameters:Parameters<T> = (currentRun.parameterGetters).map((x: ()=> any):any => x()) as Parameters<T>
    try {
        result = this.testedFunction(...(parameters));
    } catch (e) {
        handleException.call(this,currentRun, e);
        return 1;
    }
    if (currentRun.thrown != null)
        throw new Error(messageFormat(
            EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
            caseName.call(this)));
    checkReturnValue.call(this,currentRun,result)
    runReturnValueChecks.call(this,currentRun,result,parameters);
    runSideEffectChecks.call(this,currentRun);
    return 1;
}
