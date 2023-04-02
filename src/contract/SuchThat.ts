import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { ReturnValueCheckType } from "../types/ReturnValueCheckType.js";

export class SuchThat <T extends MethodType> extends ContractEntity<T> {
    suchThat<R extends ContractEntity<T>,C extends ReturnValueCheckType<T>>(
        explanation: string,
        checker: C
        ): R {
        if (this.currentRun != null)
            this.currentRun.returnValueChecks.push([explanation, checker]);
        else
            this.returnValueChecks.push([explanation, checker]);
        return this as unknown as R;
    }
}