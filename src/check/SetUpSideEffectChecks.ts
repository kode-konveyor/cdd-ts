import { RunDescriptorEntity } from "../types/RunDescriptorEntity";
import { ContractEntity } from "../types/ContractEntity";
import { MethodType } from "../types/MethodType";

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

