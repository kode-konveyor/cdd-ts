import { makeGetters } from "../src/util/makeGetters.js";

export const PARAMETERS = [1, "b"]
export const PARAMETERS_THROWING_EXCEPTION = [2, "a"]
export const PARAMETERS_WITHOUT_SIDE_EFFECT = [3, "a"]

export const ParameterTestData = {
    default: () => makeGetters(PARAMETERS) as [() => number, () => string],
    defaultFirst: () => PARAMETERS[0],
    defaultSecond: () => PARAMETERS[1],
    exceptionThrowing: () => makeGetters(PARAMETERS_THROWING_EXCEPTION) as [() => number, () => string],
    withoutSideEffects: () => makeGetters(PARAMETERS_WITHOUT_SIDE_EFFECT) as [() => number, () => string]
}