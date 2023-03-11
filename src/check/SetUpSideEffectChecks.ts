import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";

export function setUpSideEffectChecks<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    currentRun: RunDescriptorEntity<T>
):void {
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

