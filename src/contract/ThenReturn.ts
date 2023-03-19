import { ContractEntity } from "../types/ContractEntity.js";
import { THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT } from "./Messages.js";
import { MethodType } from "../types/MethodType.js";

export function thenReturn<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    returnValue: () => ReturnType<T>
): THIS {
    if (this.currentRun == null)
        throw new Error(THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT)
    this.currentRun.explanation = explanation;
    this.currentRun.returnValueGetter = returnValue;
    return this;
}
