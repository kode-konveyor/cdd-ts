import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

const THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT = "thenReturn can only be used after an ifCalledWith";

export class ThenReturn<T extends SutType> extends ContractEntity<T> {

    thenReturn(explanation: string,returnValue: ReturnType<T>): this {
        if(!this.currentRun)
            throw new Error(THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT)
        this.currentRun.explanation = explanation;
        this.currentRun.returnValue = returnValue;
        return this;
    }

}
