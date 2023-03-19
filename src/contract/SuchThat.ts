import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export class SuchThat <T extends MethodType> extends ContractEntity<T> {
    suchThat<THIS extends ContractEntity<T>>(
        explanation: string,
        checker: (returnValue: ReturnType<T>,
            ...parameters: Parameters<T>
        ) => void
    ): THIS {
        if (this.currentRun != null)
            this.currentRun.returnValueChecks.push([explanation, checker]);
        else
            this.returnValueChecks.push([explanation, checker]);
        return this as unknown as THIS;
    }
}