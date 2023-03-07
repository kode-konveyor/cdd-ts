import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { OneSideEffectCheck } from "./OneSideEffectCheck";
import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";

@injectable()
export class RunSideEffectChecks<T extends SutType> {
    constructor(
        readonly caseName: CaseName<T>,
        readonly oneSideEffectCheck: OneSideEffectCheck<T>
    ) {}


    runSideEffectChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) {
        contract.sideEffectChecks.forEach(this.oneSideEffectCheck.oneSideEffectCheck(contract))
        currentRun.sideEffectChecks.forEach(this.oneSideEffectCheck.oneSideEffectCheck(contract))
    }
}
