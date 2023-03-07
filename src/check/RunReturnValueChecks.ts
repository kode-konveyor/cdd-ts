import { RunDescriptorEntity } from "../RunDescriptorEntity";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";


@injectable()
export class RunReturnValueChecks<T extends SutType> {

    constructor(
        readonly caseName: CaseName<T>

    ) {}

    runReturnValueChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) {
        currentRun.returnValueChecks.forEach(
            entry => {
                try {
                    entry[1](currentRun.returnValue as ReturnType<T>, ...(currentRun.parameters as Parameters<T>));
                } catch (error) {
                    throw new Error(this.caseName.caseName(contract) + ": " + entry[0] + ": return value check did not hold:" + error);
                }
            }
        );
    }
}
