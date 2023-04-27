import { type MethodType } from "./MethodType.js";
import { type PromisedReturnType } from "./PromisedReturnType.js";

export type ReturnValueGetterType<T extends MethodType> =
  () => PromisedReturnType<T>;
