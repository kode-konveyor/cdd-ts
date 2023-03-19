import { PARAMETERS_WITHOUT_SIDE_EFFECT } from "./getParameters.js";
import { makeGetters } from "../../src/util/makeGetters.js";

export function getParametersWithoutSideEffects(): [() => number, () => string] {
    return makeGetters(PARAMETERS_WITHOUT_SIDE_EFFECT) as [() => number, () => string];
}
