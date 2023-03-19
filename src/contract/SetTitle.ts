import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export function setTitle<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string
): THIS {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this;
}
