import { MethodType } from "../types/MethodType";
import { ParameterGetters } from "../types/ParameterGettersType";

export function makeGetters<T extends MethodType>(data: Parameters<T>): ParameterGetters<T> {
    return data.map(x => () => x) as ParameterGetters<T>;
}
