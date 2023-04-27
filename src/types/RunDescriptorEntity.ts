import { type SideEffectCheckerType } from "./SideEffectChecker.js";
import { type MethodType } from "./MethodType.js";
import { type ParameterGetters } from "./ParameterGettersType.js";
import { type ReturnValueGetterType } from "./ReturnValueGetterType";
import { type ReturnValueCheckType } from "./ReturnValueCheckType.js";

export class RunDescriptorEntity<T extends MethodType> {
  thrown?: string | RegExp;
  parameterGetters?: ParameterGetters<T>;
  returnValueGetter?: ReturnValueGetterType<T>;
  returnValueChecks: Array<ReturnValueCheckType<T>> = [];
  sideEffectChecks: Array<[string, SideEffectCheckerType<T>]> = [];
  parameterCheck?: (...params: Parameters<T>) => unknown;
  explanation!: string;
}
