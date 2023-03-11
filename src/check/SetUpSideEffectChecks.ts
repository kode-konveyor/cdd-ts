import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { injectable } from "tsyringe";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";


@injectable()
export class SetUpSideEffectChecks<T extends SutType> {
    setUpSideEffectChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) {
        contract.sideEffectChecks.forEach(
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
}
