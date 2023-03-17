import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity";
import { ContractEntity } from "../types/ContractEntity";
import { MethodType } from "../types/MethodType";

export function setTitle<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string
): THIS {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this;
}
