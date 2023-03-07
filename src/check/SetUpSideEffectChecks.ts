import { RunDescriptorEntity } from "../RunDescriptorEntity";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";
import { injectable } from "tsyringe";


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
