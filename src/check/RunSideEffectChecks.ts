import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { oneSideEffectCheck } from "./OneSideEffectCheck";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";

export function runSideEffectChecks<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
    ) {
    this.sideEffectChecks.forEach(oneSideEffectCheck.apply(this))
    currentRun.sideEffectChecks.forEach(oneSideEffectCheck.apply(this))
}
