import { ContractEntity } from "../types/ContractEntity.js";
import { THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT } from "./Messages.js";
import { MethodType } from "../types/MethodType.js";

export class ThenReturn<T extends MethodType> extends ContractEntity<T>{
    thenReturn<THIS extends ContractEntity<T>>(
        explanation: string,
        returnValue: () => ReturnType<T>
    ): THIS {
        if (this.currentRun == null)
            throw new Error(THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT)
        this.currentRun.explanation = explanation;
        this.currentRun.returnValueGetter = returnValue;
        return this as unknown as THIS;
    }
}