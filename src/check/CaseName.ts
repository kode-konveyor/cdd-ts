import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";
import { messageFormat } from "src/util/messageFormat";
import { injectable, singleton } from "tsyringe";

const RUN_IDENTIFIER_FORMAT = "{1}:{2}:{3}";
@injectable()
export class CaseName<T extends SutType> {
    caseName( contract: ContractEntity<T>): string {
        return messageFormat(
            RUN_IDENTIFIER_FORMAT,
            contract.explanation,
            contract.checkedCase,
            contract.currentRunExplanation);
    }
}
