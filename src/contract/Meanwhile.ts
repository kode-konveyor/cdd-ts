import { ContractEntity } from "./ContractEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { MethodType } from "./MethodType";

export function meanwhile<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    reason: string,
    checker: SideEffectChecker
): THIS {
    if (this.currentRun == null)
        this.sideEffectChecks.push([reason, checker])
    else
        this.currentRun.sideEffectChecks.push([reason, checker])
    return this
}
