import { CaseDescriptorEntity } from "./CaseDescriptorEntity.js";
import { RunDescriptorEntity } from "./RunDescriptorEntity.js";
import { MethodType } from "./MethodType.js";
import { ReturnValueCheckCaseType } from "./ReturnValueCheckCaseType.js";

export class ContractEntity<T extends MethodType> {
  explanation!: string;
  currentCase?: string;
  currentRun?: RunDescriptorEntity<T>;
  returnValueChecks: Array<ReturnValueCheckCaseType<T>> = [];
  cases: Record<string, CaseDescriptorEntity<T>> = {};
  checkedCase!: string;
  currentRunExplanation!: string;
}
