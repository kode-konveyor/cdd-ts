import { MethodType } from "./MethodType";

export type ReturnValueCheckType<T extends MethodType> = (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void;
