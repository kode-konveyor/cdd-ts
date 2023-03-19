import { MethodType } from "./MethodType.js";
import { ReturnValueCheckType } from "./ReturnValueCheckType.js";

export type ReturnValueCheckCaseType<T extends MethodType> = [string, ReturnValueCheckType<T>];
