import { type MethodType } from "./MethodType.js";
import { type PromisedReturnType } from "./PromisedReturnType.js";

export type ReturnValueCheckType<T extends MethodType> = (
  returnValue: PromisedReturnType<T>,
  ...parameters: Parameters<T>
) => unknown;
