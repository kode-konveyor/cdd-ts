import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class ContractEntity<T extends SutType> {
    explanation!: string;
    currentCase?: string;
    currentRun?:  RunDescriptorEntity<T>;
    testedFunction!: T;
    returnValueChecks: [string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void][] = []
    sideEffectChecks: [string, SideEffectChecker<T>][] = []
    cases: Record<string, CaseDescriptorEntity<T>> = {}

}