import { type CaseDescriptorEntity } from "./CaseDescriptorEntity.js";
import { type RunDescriptorEntity } from "./RunDescriptorEntity.js";
import { type MethodType } from "./MethodType.js";
import { type ReturnValueCheckCaseType } from "./ReturnValueCheckCaseType.js";

export class ContractEntity<T extends MethodType> {
  explanation!: string;
  currentCase?: string;
  currentRun?: RunDescriptorEntity<T>;
  returnValueChecks: Array<ReturnValueCheckCaseType<T>> = [];
  cases: Record<string, CaseDescriptorEntity<T>> = {};
  checkedCase!: string;
  currentRunExplanation!: string;
}
