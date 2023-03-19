import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export function suchThat<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    checker: (returnValue: ReturnType<T>,
        ...parameters: Parameters<T>
    ) => void
): THIS {
    if (this.currentRun != null)
        this.currentRun.returnValueChecks.push([explanation, checker]);
    else
        this.returnValueChecks.push([explanation, checker]);
    return this;
}
