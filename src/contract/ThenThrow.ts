import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

const THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT = "thenThrow can only be used after an ifCalledWith";

export class ThenThrow<T extends SutType> extends ContractEntity<T> {
    thenThrow(explanation: string, expectedRegex: string|RegExp):this {
        if(!this.currentRun)
            throw new Error(THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT)
        this.currentRun.explanation = explanation;
        this.currentRun.thrown = expectedRegex;
        return this;
    }
}
