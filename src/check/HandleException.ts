import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { messageFormat } from "src/util/messageFormat";
import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";
import { NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT, UNEXPECTED_EXCEPTION_MESSAGE_FORMAT } from "./Messages";



@injectable()
export class HandleException<T extends SutType> {

    constructor(
        readonly caseName: CaseName<T>

    ) {}

    handleException(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, catched: unknown) {
        if (currentRun.thrown === undefined) {
            throw new Error(messageFormat(
                UNEXPECTED_EXCEPTION_MESSAGE_FORMAT,
                this.caseName.caseName(contract),
                String(catched)));
        }
        if (!String(catched).match(currentRun.thrown))
            throw new Error(messageFormat(
                NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT,
                this.caseName.caseName(contract),
                String(catched)));
    }
}
