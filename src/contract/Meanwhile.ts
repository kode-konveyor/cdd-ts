import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { SideEffectCheckerType } from "../types/SideEffectChecker.js";

export class MeanWhile<T extends MethodType> extends ContractEntity<T> {
    meanwhile<THIS extends ContractEntity<T>>(
        reason: string,
        checker: SideEffectCheckerType
    ): THIS {
        if (this.currentRun == null)
            this.sideEffectChecks.push([reason, checker])
        else
            this.currentRun.sideEffectChecks.push([reason, checker])
        return this as unknown as THIS
    }
}