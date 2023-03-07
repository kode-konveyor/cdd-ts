import { ContractEntity } from "./ContractEntity";
import { THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT } from "./Messages";
import { SutType } from "./SutType";

export class ThenThrow<T extends SutType> extends ContractEntity<T> {
    thenThrow(explanation: string, expectedRegex: string|RegExp):this {
        if(!this.currentRun)
            throw new Error(THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT)
        this.currentRun.explanation = explanation;
        this.currentRun.thrown = expectedRegex;
        return this;
    }
}
