import { RunDescriptorEntity } from "../RunDescriptorEntity";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";


@injectable()
export class RunSideEffectChecks<T extends SutType> {
    constructor(
        readonly caseName: CaseName<T>

    ) {}

    runSideEffectChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) {
        contract.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.caseName.caseName(contract) + ": side effect check: " + entry[0] + ": did not hold:" + error);
                }
                entry[1].tearDown();
            }
        );
        currentRun.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.caseName.caseName(contract) + ": side effect check: " + entry[0] + ": did not hold:" + error);
                }
                entry[1].tearDown();
            }
        );
    }
}
