import { makeGetters } from "../src/util/makeGetters.js";
import { PARAMETERS } from "./ParametersTestData.js";

export function getParametersGetter(): [() => () => number, () => () => string] {
    return makeGetters(makeGetters(PARAMETERS)) as [() => () => number, () => () => string];
}
