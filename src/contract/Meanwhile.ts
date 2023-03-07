import { ContractEntity } from "./ContractEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class Meanwhile<T extends SutType> extends ContractEntity<T> {
    meanwhile(reason: string, checker: SideEffectChecker<T>):this {
        if(!this.currentRun)
            this.sideEffectChecks.push([reason,checker])
        else
            this.currentRun.sideEffectChecks.push([reason,checker])
        return this
    }

}
