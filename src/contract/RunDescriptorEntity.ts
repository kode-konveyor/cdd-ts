import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class RunDescriptorEntity<T extends SutType> {
    thrown?: string|RegExp;
    parameters?: Parameters<T>;
    returnValue?: ReturnType<T>;
    returnValueChecks: Array<[string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void]> = [];
    sideEffectChecks: Array<[string, SideEffectChecker]> = [];
    explanation!: string;
}
