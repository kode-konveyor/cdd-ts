import { MethodType } from "./MethodType";
import { ReturnValueCheckType } from "./ReturnValueCheckType";

export type ReturnValueCheckCaseType<T extends MethodType> = [string, ReturnValueCheckType<T>];
