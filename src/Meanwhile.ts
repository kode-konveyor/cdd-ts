import { ShallEntity } from "./ShallEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class Meanwhile<T extends SutType> extends ShallEntity<T> {
    meanwhile(arg0: string, arg1: SideEffectChecker<T>) {
        throw new Error("Method not implemented.");
    }

}
