import { type MethodType } from "./MethodType.js";
import { type ReturnValueCheckType } from "./ReturnValueCheckType.js";

export type ReturnValueCheckCaseType<T extends MethodType> = [
  string,
  ReturnValueCheckType<T>
];
