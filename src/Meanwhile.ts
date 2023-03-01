import { ShallEntity } from "./ShallEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class Meanwhile<T extends SutType> extends ShallEntity<T> {
    meanwhile(reason: string, checker: SideEffectChecker<T>) {
        this.sideEffectChecks.push([reason,checker])
        return this
    }

}
