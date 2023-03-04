import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class ThenReturn<T extends SutType> extends ShallEntity<T> {

    thenReturn(returnValue: ReturnType<T>): this {
        if(!this.currentRun)
            throw new Error("thenReturn can only be used after an ifCalledWith")
        this.currentRun.returnValue = returnValue;
        return this;
    }

}
