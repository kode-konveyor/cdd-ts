import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { MethodType } from "./MethodType";

export function setTitle<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string
): THIS {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this;
}
