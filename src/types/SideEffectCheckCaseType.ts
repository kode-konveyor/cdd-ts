import { type MethodType } from "./MethodType.js";
import { type SideEffectCheckerType } from "./SideEffectChecker.js";

export type SideEffectCheckCaseType<T extends MethodType> = [
  string,
  SideEffectCheckerType<T>
];
