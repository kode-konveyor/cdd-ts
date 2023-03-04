import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class RunDescriptorEntity<T extends SutType> {
    thrown?: string;
    parameters?: Parameters<T>;
    returnValue?: ReturnType<T>;
    returnValueChecks: [string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void][] = [];
    sideEffectChecks: [string, SideEffectChecker<T>][] = [];
}
