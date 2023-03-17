import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { MethodType } from "./MethodType";
import { ReturnValueCheckCaseType } from "./ReturnValueCheckCaseType";
import { SideEffectCheckCaseType } from "./SideEffectCheckCaseType";

export class ContractEntity<T extends MethodType> {
    explanation!: string;
    currentCase?: string;
    currentRun?: RunDescriptorEntity<T>;
    testedFunction!: T;
    returnValueChecks: Array<ReturnValueCheckCaseType<T>> = []
    sideEffectChecks: Array<SideEffectCheckCaseType> = []
    cases: Record<string, CaseDescriptorEntity<T>> = {}
    checkedCase!: string;
    currentRunExplanation!: string;

}