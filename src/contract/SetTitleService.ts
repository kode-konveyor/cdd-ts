import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { type SetTitleReturnType } from "../types/SetTitleReturnType.js";

export class SetTitleService<T extends MethodType> extends ContractEntity<T> {
  setTitle(explanation: string): SetTitleReturnType<T> {
    this.explanation = explanation;
    this.cases[""] = new CaseDescriptorEntity();
    return this as unknown as SetTitleReturnType<T>;
  }
}
