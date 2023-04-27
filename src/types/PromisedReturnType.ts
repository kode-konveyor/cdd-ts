import { type MethodType } from "./MethodType.js";

export type PromisedReturnType<T extends MethodType> =
  ReturnType<T> extends Promise<infer S> ? S : ReturnType<T>;
