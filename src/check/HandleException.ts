import { RunDescriptorEntity } from "../RunDescriptorEntity";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";


@injectable()
export class HandleException<T extends SutType> {

    constructor(
        readonly caseName: CaseName<T>

    ) {}

    handleException(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, catched: unknown) {
        if (currentRun.thrown === undefined) {
            throw new Error(this.caseName.caseName(contract) + ": unexpected exception:" + catched);
        }
        if (!String(catched).match(currentRun.thrown))
            throw new Error(this.caseName.caseName(contract) + ":Not the expected exception thrown. Got:" + catched);
    }
}
