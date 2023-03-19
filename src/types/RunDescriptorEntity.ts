import { SideEffectCheckerType } from "./SideEffectChecker.js";
import { MethodType } from "./MethodType.js";
import { ParameterGetters } from "./ParameterGettersType.js";

export class RunDescriptorEntity<T extends MethodType> {
    thrown?: string | RegExp;
    parameterGetters?: ParameterGetters<T>;
    returnValueGetter?: () => ReturnType<T>;
    returnValueChecks: Array<[string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void]> = [];
    sideEffectChecks: Array<[string, SideEffectCheckerType]> = [];
    explanation!: string;
}

