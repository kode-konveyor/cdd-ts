import { makeGetters } from "../src/util/makeGetters.js";
import { PARAMETERS } from "./ParametersTestData.js";

export const ParameterGetterTestData = {
  default: makeGetters(makeGetters(PARAMETERS)) as [
    () => () => number,
    () => () => string
  ],
};
