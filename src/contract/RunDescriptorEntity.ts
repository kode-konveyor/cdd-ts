import { SideEffectChecker } from "./SideEffectChecker";
import { MethodType } from "./MethodType";
import { ParameterGetters } from "./ParameterGetters";

export class RunDescriptorEntity<T extends MethodType> {
    thrown?: string|RegExp;
    parameterGetters?: ParameterGetters<T>;
    returnValueGetter?: ()=> ReturnType<T>;
    returnValueChecks: Array<[string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void]> = [];
    sideEffectChecks: Array<[string, SideEffectChecker]> = [];
    explanation!: string;
}

