import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export function setUpSideEffectChecks<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
): void {
    this.sideEffectChecks.forEach(
        (entry) => {
            entry[1].setUp();
        }
    );
    currentRun.sideEffectChecks.forEach(
        (entry) => {
            entry[1].setUp();
        }
    );
}

