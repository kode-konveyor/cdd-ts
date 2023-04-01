import { SideEffectCheckerType } from "./SideEffectChecker.js";
import { MethodType } from "./MethodType.js";
import { ParameterGetters } from "./ParameterGettersType.js";
import { ParameterConstraintCaseType } from "./ParameterConstraintCaseType.js";
import { ReturnValueCheckCaseType } from "./ReturnValueCheckCaseType.js";
import { ReturnValueGetterType } from "./ReturnValueGetterType";

export class RunDescriptorEntity<T extends MethodType> {
    thrown?: string | RegExp;
    parameterGetters?: ParameterGetters<T>;
    returnValueGetter?: ReturnValueGetterType<T>;
    returnValueChecks: Array<ReturnValueCheckCaseType<T>> = [];
    parameterConstraints: Array<ParameterConstraintCaseType<T>> = []
    sideEffectChecks: Array<[string, SideEffectCheckerType]> = [];
    explanation!: string;
}

