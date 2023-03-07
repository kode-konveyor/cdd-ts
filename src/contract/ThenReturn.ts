import { ContractEntity } from "./ContractEntity";
import { THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT } from "./Messages";
import { SutType } from "./SutType";


export class ThenReturn<T extends SutType> extends ContractEntity<T> {

    thenReturn(explanation: string,returnValue: ReturnType<T>): this {
        if(!this.currentRun)
            throw new Error(THENRETURN_MISSING_IFCALLEDWITH_MESSAGE_FORMAT)
        this.currentRun.explanation = explanation;
        this.currentRun.returnValue = returnValue;
        return this;
    }

}
