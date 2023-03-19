import { makeGetters } from "../../src/util/makeGetters.js";

export const PARAMETERS = [1, "b"]
export const PARAMETERS_THROWING_EXCEPTION = [2, "a"]
export const PARAMETERS_WITHOUT_SIDE_EFFECT = [3, "a"]

export function getParameters(): [() => number, () => string] {
    return makeGetters(PARAMETERS) as [() => number, () => string];
}
