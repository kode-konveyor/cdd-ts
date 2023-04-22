import { bound } from "../src/cdd-ts.js";
import { MakeGettersService } from "../src/util/MakeGettersService.js";
import { PARAMETERS } from "./ParameterTestData.js";

const makeGetters =
  bound<MakeGettersService["makeGetters"]>(MakeGettersService);

export const ParameterGetterTestData = {
  default: makeGetters(makeGetters(PARAMETERS)) as [
    () => () => number,
    () => () => string
  ],
};
