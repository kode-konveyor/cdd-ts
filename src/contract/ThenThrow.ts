import { ContractEntity } from "../types/ContractEntity";
import { THENTHROW_MISSING_IFCALEDWITH_MESSAGE_FORMAT } from "./Messages";
import { MethodType } from "../types/MethodType";

export function thenThrow<T extends MethodType, THIS extends ContractEntity<T>>(
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
