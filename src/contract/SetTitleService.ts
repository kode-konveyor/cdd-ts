import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type IfCalledWithType } from "../types/IfCalledWithType.js";

export class SetTitleService<T extends MethodType> extends ContractEntity<T> {
  setTitle(explanation: string): IfCalledWithType<T> {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this as unknown as IfCalledWithType<T>;
  }
}
