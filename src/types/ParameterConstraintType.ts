import { MethodType } from "./MethodType.js";

export type ParameterConstraintType<T extends MethodType> = (...parameters: Parameters<T>) => unknown;
