import { RunDescriptorEntity } from "../contract/RunDescriptorEntity";
import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { RunSideEffectChecks } from "./RunSideEffectChecks";
import { RunReturnValueChecks } from "./RunReturnValueChecks";
import { CheckReturnValue } from "./CheckReturnValue";
import { HandleException } from "./HandleException";
import { SetUpSideEffectChecks } from "./SetUpSideEffectChecks";
import { messageFormat } from "src/util/messageFormat";
import { ContractEntity } from "src/contract/ContractEntity";
import { SutType } from "src/contract/SutType";


const EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT = "{1}: Exception expected but not thrown";

@injectable()
export class HandleRun<T extends SutType> {
    constructor(
        readonly caseName: CaseName<T>,
        readonly setUpSideEffectChecks: SetUpSideEffectChecks<T>,
        readonly handleException: HandleException<T>,
        readonly checkReturnValue: CheckReturnValue<T>,
        readonly runReturnValueChecks: RunReturnValueChecks<T>,
        readonly runSideEffectChecks: RunSideEffectChecks<T>
    ) {}

    handleRun= (contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) => {
        contract.currentRunExplanation = currentRun.explanation;
        if (currentRun.parameters === undefined)
            throw new Error(this.caseName.caseName(contract) + ": no ifcalledWith");
        const returnValue = currentRun.returnValue;
        const thrown = currentRun.thrown;
        this.setUpSideEffectChecks.setUpSideEffectChecks(contract, currentRun);
        let result;
        let catched;
        try {
            const parameters: Parameters<T> = currentRun.parameters;
            result = contract.testedFunction(...(parameters as any[]));
        } catch (e) {
            this.handleException.handleException(contract, currentRun, e);
            return 1;
        }
        if (currentRun.thrown)
            throw new Error(messageFormat(
                EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT,
                this.caseName.caseName(contract)));
        this.checkReturnValue.checkReturnValue(contract, currentRun, result);
        this.runReturnValueChecks.runReturnValueChecks(contract, currentRun);
        this.runSideEffectChecks.runSideEffectChecks(contract, currentRun);
        return 1;
    }
}
