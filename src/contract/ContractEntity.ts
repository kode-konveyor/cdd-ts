import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { MethodType } from "./MethodType";

export class ContractEntity<T extends MethodType> {
    explanation!: string;
    currentCase?: string;
    currentRun?:  RunDescriptorEntity<T>;
    testedFunction!: T;
    returnValueChecks: Array<[string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void]> = []
    sideEffectChecks: Array<[string, SideEffectChecker]> = []
    cases: Record<string, CaseDescriptorEntity<T>> = {}
    checkedCase!: string;
    currentRunExplanation!: string;

}