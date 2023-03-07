import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { messageFormat } from "src/util/messageFormat";
import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";


const RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT = "{1}: {2}: return value check did not hold:{3}";

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
                    throw new Error(messageFormat(
                        RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT,
                        this.caseName.caseName(contract),
                        entry[0],
                        String(error)));
                }
            }
        );
    }
}
