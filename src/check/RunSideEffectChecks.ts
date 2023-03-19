import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { oneSideEffectCheck } from "./OneSideEffectCheck.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export function runSideEffectChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): void {
    this.sideEffectChecks.forEach(oneSideEffectCheck.call(this))
    currentRun.sideEffectChecks.forEach(oneSideEffectCheck.call(this))
}
