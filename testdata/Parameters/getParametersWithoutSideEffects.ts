import { PARAMETERS_WITHOUT_SIDE_EFFECT } from "./getParameters";
import { makeGetters } from "../../src/util/makeGetters";

export function getParametersWithoutSideEffects(): [() => number, () => string] {
    return makeGetters(PARAMETERS_WITHOUT_SIDE_EFFECT) as [() => number, () => string];
}
