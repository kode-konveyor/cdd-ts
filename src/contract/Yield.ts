import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { ParameterGetters } from "../types/ParameterGettersType.js";
import { ReturnValueGetterType } from "../types/ReturnValueGetterType.js";

export class Yield<T extends MethodType> extends ContractEntity<T> {

    yield<I extends ParameterGetters<T>,O extends ReturnValueGetterType<T>>(paramgetters: I, returngetter:O):this {
        if(this.currentRun === undefined)
            throw new Error("aaaa")
        this.currentRun.parameterGetters = paramgetters
        this.currentRun.returnValueGetter = returngetter
        return this
    }
}