import { makeGetters } from "../src/util/makeGetters.js";

export const PARAMETERS = [1, "b"]
export const PARAMETERS_THROWING_EXCEPTION = [2, "a"]
export const PARAMETERS_WITH_SIDE_EFFECT = [3, "b"]

export const ParameterTestData = {
    default: () => makeGetters(PARAMETERS) as [() => number, () => string],
    defaultFirst: () => PARAMETERS[0],
    returnvaluegGetter: () => () => "1",
    defaultSecond: () => PARAMETERS[1],
    defaultSimple: () => PARAMETERS,
    throwingSimple: () => PARAMETERS_THROWING_EXCEPTION,
    exceptionThrowing: () => makeGetters(PARAMETERS_THROWING_EXCEPTION) as [() => number, () => string],
    withSideEffects: () => makeGetters(PARAMETERS_WITH_SIDE_EFFECT) as [() => number, () => string]
}