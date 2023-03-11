import { ContractEntity } from "./ContractEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export function meanwhile<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    reason: string,
    checker: SideEffectChecker<T>
    ):THIS {
    if(!this.currentRun)
        this.sideEffectChecks.push([reason,checker])
    else
        this.currentRun.sideEffectChecks.push([reason,checker])
    return this
}
