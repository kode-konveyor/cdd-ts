import { ContractEntity } from "../types/ContractEntity.js";
import { SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { MethodType } from "../types/MethodType.js";

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
