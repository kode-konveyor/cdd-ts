import { bound } from "../src/cdd-ts.js";
import { MakeGettersService } from "../src/util/MakeGettersService.js";
import { ParameterCheckerTestData } from "./ParameterCheckerTestData.js";
import { PARAMETERS } from "./ParameterTestData.js";

const makeGetters =
  bound<MakeGettersService["makeGetters"]>(MakeGettersService);

export const ParameterGetterTestData = {
  default: makeGetters(makeGetters(PARAMETERS)) as [
    () => () => number,
    () => () => string
  ],
  withChecker: () => {
    return {
      default: makeGetters(PARAMETERS) as [() => number, () => string],
      checker: ParameterCheckerTestData.default,
    };
  },
  withCheckerFailing: () => {
    return {
      default: makeGetters(PARAMETERS) as [() => number, () => string],
      checker: ParameterCheckerTestData.failing,
    };
  },
};
