import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { messageFormat } from "src/util/messageFormat";
import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";


const RETURN_VALUE_MISMATCH_MESSAGE_FORMAT = "{1}: return value mismatch:\nexpected:{2}\nactual:{3}";
@injectable()
export class CheckReturnValue<T extends SutType> {
    constructor(
        readonly caseName: CaseName<T>

    ) {}

    checkReturnValue(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, result: ReturnType<T>) {
        if (result !== currentRun.returnValue)
            throw new Error(messageFormat(
                RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
                this.caseName.caseName(contract),
                String(currentRun.returnValue),
                result));
    }
}
