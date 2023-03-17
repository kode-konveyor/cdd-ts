import { PARAMETERS_THROWING_EXCEPTION } from "./getParameters";
import { makeGetters } from "../../src/util/makeGetters";

export function getParametersThrowingException(): [() => number, () => string] {
    return makeGetters(PARAMETERS_THROWING_EXCEPTION) as [() => number, () => string];
}
