import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";

export class SetTitleService<T extends MethodType> extends ContractEntity<T> {
  setTitle<R extends ContractEntity<T>>(explanation: string): R {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this as unknown as R;
  }
}