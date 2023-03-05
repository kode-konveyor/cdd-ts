import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export class ThenReturn<T extends SutType> extends ContractEntity<T> {

    thenReturn(explanation: string,returnValue: ReturnType<T>): this {
        if(!this.currentRun)
            throw new Error("thenReturn can only be used after an ifCalledWith")
        this.currentRun.explanation = explanation;
        this.currentRun.returnValue = returnValue;
        return this;
    }

}
