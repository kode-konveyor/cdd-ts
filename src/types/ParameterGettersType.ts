import { AsGetters } from "../typefunctions/AsGetters.js";
import { MethodType } from "./MethodType.js";

export type ParameterGetters<T extends MethodType> = Extract<
  AsGetters<Parameters<T>>,
  Array<unknown>
>;
