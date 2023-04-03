import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export async function setUpSideEffectChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): Promise<void> {
    for(const entry of this.sideEffectChecks) {
        await entry[1].setUp();
    }
    for(const entry of currentRun.sideEffectChecks) {
        await entry[1].setUp();
    }
}

export function tearDownSideEffectChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): void {
    for(const entry of this.sideEffectChecks) {
        entry[1].tearDown();
    }
    for(const entry of currentRun.sideEffectChecks) {
        entry[1].tearDown();
    }
}
