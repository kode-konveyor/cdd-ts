import { PARAMETERS } from "../Parameters/getParameters.js";
import { makeGetters } from "../../src/util/makeGetters.js";

export function getParametersGetter(): [() => () => number, () => () => string] {
    return makeGetters(makeGetters(PARAMETERS)) as [() => () => number, () => () => string];
}
