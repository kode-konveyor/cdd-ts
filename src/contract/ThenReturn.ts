import { ContractEntity } from "./ContractEntity";
import { THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT } from "./Messages";
import { MethodType } from "./MethodType";

export function thenReturn<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    returnValue: ()=> ReturnType<T>
): THIS {
    if (this.currentRun == null)
        throw new Error(THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT)
    this.currentRun.explanation = explanation;
    this.currentRun.returnValueGetter = returnValue;
    return this;
}
