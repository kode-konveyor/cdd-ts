import { type MethodType } from "../../src/types/MethodType.js";

export type DotCall<THIS, T extends MethodType> = (
  self: THIS,
  ...args: Parameters<T>
) => ReturnType<T>;
