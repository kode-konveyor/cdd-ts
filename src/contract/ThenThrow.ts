import { ContractEntity } from "../types/ContractEntity.js";
import { THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT } from "./Messages.js";
import { MethodType } from "../types/MethodType.js";

export class ThenThrow<T extends MethodType> extends ContractEntity<T> {
    thenThrow<THIS extends ContractEntity<T>>(
        this: THIS,
        explanation: string,
        expectedRegex: string | RegExp
    ): THIS {
        if (this.currentRun == null)
            throw new Error(THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT)
        this.currentRun.explanation = explanation;
        this.currentRun.thrown = expectedRegex;
        return this;
    }
}