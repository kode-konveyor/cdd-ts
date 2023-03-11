import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";
import { messageFormat } from "../util/messageFormat";
import { injectable } from "tsyringe";
import { RUN_IDENTIFIER_FORMAT } from "./Messages";

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
