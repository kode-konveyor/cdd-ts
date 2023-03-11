import { ContractEntity } from "./ContractEntity";
import { THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT } from "./Messages";
import { SutType } from "./SutType";

export function thenReturn<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    returnValue: ReturnType<T>
):THIS {
    if(this.currentRun == null)
        throw new Error(THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT)
    this.currentRun.explanation = explanation;
    this.currentRun.returnValue = returnValue;
    return this;
}
