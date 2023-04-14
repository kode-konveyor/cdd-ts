import { type MethodType } from "../types/MethodType.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { annotateFunction } from "./annotateFunction.js";

export function makeGetters<T extends MethodType>(
  data: Parameters<T>
): ParameterGetters<T> {
  return data.map((x) => annotateFunction(() => x)) as ParameterGetters<T>;
}
