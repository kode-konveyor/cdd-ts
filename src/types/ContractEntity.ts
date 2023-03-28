import { CaseDescriptorEntity } from "./CaseDescriptorEntity.js";
import { RunDescriptorEntity } from "./RunDescriptorEntity.js";
import { MethodType } from "./MethodType.js";
import { ReturnValueCheckCaseType } from "./ReturnValueCheckCaseType.js";
import { SideEffectCheckCaseType } from "./SideEffectCheckCaseType.js";
import { ParameterConstraintCaseType } from "./ParameterConstraintCaseType";

export class ContractEntity<T extends MethodType> {
    explanation!: string;
    currentCase?: string;
    currentRun?: RunDescriptorEntity<T>;
    testedFunction!: T;
    returnValueChecks: Array<ReturnValueCheckCaseType<T>> = []
    parameterConstraints: Array<ParameterConstraintCaseType<T>> = []
    sideEffectChecks: Array<SideEffectCheckCaseType> = []
    cases: Record<string, CaseDescriptorEntity<T>> = {}
    checkedCase!: string;
    currentRunExplanation!: string;

}