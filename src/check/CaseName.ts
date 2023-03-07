import { injectable, singleton } from "tsyringe";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";

@injectable()
export class CaseName<T extends SutType> {
    caseName( contract: ContractEntity<T>): string {
        return contract.explanation + ":" + contract.checkedCase + ":" + contract.currentRunExplanation;
    }
}
