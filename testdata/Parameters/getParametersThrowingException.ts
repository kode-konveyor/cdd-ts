import { PARAMETERS_THROWING_EXCEPTION } from "./getParameters.js";
import { makeGetters } from "../../src/util/makeGetters.js";

export function getParametersThrowingException(): [() => number, () => string] {
    return makeGetters(PARAMETERS_THROWING_EXCEPTION) as [() => number, () => string];
}
