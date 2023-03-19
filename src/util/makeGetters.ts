import { MethodType } from "../types/MethodType.js";
import { ParameterGetters } from "../types/ParameterGettersType.js";

export function makeGetters<T extends MethodType>(data: Parameters<T>): ParameterGetters<T> {
    return data.map(x => () => x) as ParameterGetters<T>;
}
