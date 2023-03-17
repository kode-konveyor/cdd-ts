import { PARAMETERS } from "../Parameters/getParameters";
import { makeGetters } from "../../src/util/makeGetters";

export function getParametersGetter(): [() => () => number, () => () => string] {
    return makeGetters(makeGetters(PARAMETERS)) as [() => () => number, () => () => string];
}
