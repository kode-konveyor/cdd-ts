import { type MethodType } from "./MethodType.js";

export type DotCall<THIS, T extends MethodType> = (
  self: THIS,
  ...args: Parameters<T>
) => ReturnType<T>;
