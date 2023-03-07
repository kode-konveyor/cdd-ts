import { RunDescriptorEntity } from "../RunDescriptorEntity";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";


@injectable()
export class CheckReturnValue<T extends SutType> {
    constructor(
        readonly caseName: CaseName<T>

    ) {}

    checkReturnValue(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, result: ReturnType<T>) {
        if (result !== currentRun.returnValue)
            throw new Error(
                this.caseName.caseName(contract) + ": return value mismatch:" +
                "\nexpected:" + currentRun.returnValue +
                "\nactual:" + result);
    }
}
