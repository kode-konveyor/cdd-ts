import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export function setTitle<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string
    ):THIS {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this;
}
