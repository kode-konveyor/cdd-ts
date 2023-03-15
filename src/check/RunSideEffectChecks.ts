import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { oneSideEffectCheck } from "./OneSideEffectCheck";
import { ContractEntity } from "../contract/ContractEntity";
import { MethodType } from "../contract/MethodType";

export function runSideEffectChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): void {
    this.sideEffectChecks.forEach(oneSideEffectCheck.call(this))
    currentRun.sideEffectChecks.forEach(oneSideEffectCheck.call(this))
}
