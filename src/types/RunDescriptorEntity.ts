import { type SideEffectCheckerType } from "./SideEffectChecker.js";
import { type MethodType } from "./MethodType.js";
import { type ParameterGetters } from "./ParameterGettersType.js";
import { type ReturnValueCheckCaseType } from "./ReturnValueCheckCaseType.js";
import { type ReturnValueGetterType } from "./ReturnValueGetterType";

export class RunDescriptorEntity<T extends MethodType> {
  thrown?: string | RegExp;
  parameterGetters?: ParameterGetters<T>;
  returnValueGetter?: ReturnValueGetterType<T>;
  returnValueChecks: Array<ReturnValueCheckCaseType<T>> = [];
  sideEffectChecks: Array<[string, SideEffectCheckerType]> = [];
  explanation!: string;
}
