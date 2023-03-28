import { MethodType } from "./MethodType.js";
import { ParameterConstraintType } from "./ParameterConstraintType";

export type ParameterConstraintCaseType<T extends MethodType> = [string, ParameterConstraintType<T>];
