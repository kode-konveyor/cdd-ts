import { MethodType } from "./MethodType.js";

export type ReturnValueGetterType<T extends MethodType> = (() => ReturnType<T>) ;
