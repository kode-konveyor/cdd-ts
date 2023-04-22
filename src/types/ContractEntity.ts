import { type CaseDescriptorEntity } from "./CaseDescriptorEntity.js";
import { type RunDescriptorEntity } from "./RunDescriptorEntity.js";
import { type MethodType } from "./MethodType.js";

export class ContractEntity<T extends MethodType> {
  explanation!: string;
  currentCase?: string;
  currentRun?: RunDescriptorEntity<T>;
  cases: Record<string, CaseDescriptorEntity<T>> = {};
  checkedCase!: string;
  currentRunExplanation!: string;
}
