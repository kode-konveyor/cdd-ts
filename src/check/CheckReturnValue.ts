import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { messageFormat } from "src/util/messageFormat";
import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";
import { RETURN_VALUE_MISMATCH_MESSAGE_FORMAT } from "./Messages";
import equal from "fast-deep-equal";


@injectable()
export class CheckReturnValue<T extends SutType> {
    constructor(
        readonly caseName: CaseName<T>

    ) {}

    checkReturnValue(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, result: ReturnType<T>) {
        const expected = JSON.stringify(currentRun.returnValue);
        const actual = JSON.stringify(result);
        if (actual != expected)
            throw new Error(messageFormat(
                RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
                this.caseName.caseName(contract),
                expected,
                actual));
    }
}
