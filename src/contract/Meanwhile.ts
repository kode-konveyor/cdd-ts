import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { ThrowIfCalledWithMissingFor } from "./ThrowIfCalledWithMissingFor.js";


export class MeanWhile<T extends MethodType> extends ContractEntity<T> {

    constructor(
        readonly throwIfCalledWithMissingFor = ThrowIfCalledWithMissingFor.prototype.throwIfCalledWithMissingFor
    ) {
        super()
    }

    meanwhile<THIS extends ContractEntity<T>>(
        reason: string,
        checker: SideEffectCheckerType,
    ): THIS {
        this.currentRun?.sideEffectChecks.push([reason, checker])  ?? this.throwIfCalledWithMissingFor("meanWhile")
        return this as unknown as THIS
    }

}