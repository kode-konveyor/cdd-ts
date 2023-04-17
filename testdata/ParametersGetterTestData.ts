import { bound } from "../src/util/bound.js";
import { MakeGettersService } from "../src/util/MakeGettersService.js";
import { PARAMETERS } from "./ParametersTestData.js";

const makeGetters =
  bound<MakeGettersService["makeGetters"]>(MakeGettersService);

export const ParameterGetterTestData = {
  default: makeGetters(makeGetters(PARAMETERS)) as [
    () => () => number,
    () => () => string
  ],
};
