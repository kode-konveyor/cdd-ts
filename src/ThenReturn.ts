import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class ThenReturn<T extends SutType> extends ShallEntity<T> {

    thenReturn(returnValue: ReturnType<T>) {
        this.returnValue = returnValue;
        return this;
    }

}
