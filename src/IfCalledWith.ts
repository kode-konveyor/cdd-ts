import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class IfCalledWith<T extends SutType> extends ShallEntity<T> {

    ifCalledWith(...parameters: Parameters<T>) {
        this.parameters = parameters;
        return this;
    }

}
