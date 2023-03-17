import { ContractEntity } from "../types/ContractEntity";
import { SideEffectCheckerType } from "../types/SideEffectChecker";
import { MethodType } from "../types/MethodType";

export function meanwhile<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    reason: string,
    checker: SideEffectCheckerType
): THIS {
    if (this.currentRun == null)
        this.sideEffectChecks.push([reason, checker])
    else
        this.currentRun.sideEffectChecks.push([reason, checker])
    return this
}
