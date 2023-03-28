import { MethodType } from "./MethodType.js";

export type ReturnValueCheckType<T extends MethodType> = (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => unknown;
