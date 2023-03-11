import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export function suchThat<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    checker: (returnValue: ReturnType<T>,
        ...parameters: Parameters<T>
        ) => void
    ):THIS {
    if(this.currentRun)
        this.currentRun.returnValueChecks.push([explanation, checker]);
    else
        this.returnValueChecks.push([explanation, checker]);
    return this;
}
