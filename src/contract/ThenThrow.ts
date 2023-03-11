import { ContractEntity } from "./ContractEntity";
import { THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT } from "./Messages";
import { SutType } from "./SutType";

export function thenThrow<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    expectedRegex: string|RegExp
):THIS {
    if(!this.currentRun)
        throw new Error(THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT)
    this.currentRun.explanation = explanation;
    this.currentRun.thrown = expectedRegex;
    return this;
}
