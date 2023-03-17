import { RunDescriptorEntity } from "../types/RunDescriptorEntity";
import { oneSideEffectCheck } from "./OneSideEffectCheck";
import { ContractEntity } from "../types/ContractEntity";
import { MethodType } from "../types/MethodType";

export function runSideEffectChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): void {
    this.sideEffectChecks.forEach(oneSideEffectCheck.call(this))
    currentRun.sideEffectChecks.forEach(oneSideEffectCheck.call(this))
}
