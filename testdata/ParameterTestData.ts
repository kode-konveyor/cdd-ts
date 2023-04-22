import { bound } from "../src/cdd-ts.js";
import { MakeGettersService } from "../src/util/MakeGettersService.js";
import { ReturnValueCheckTestData } from "./ReturnValueCheckTestData.js";

const makeGetters =
  bound<MakeGettersService["makeGetters"]>(MakeGettersService);

export const PARAMETERS = [1, "b"];
export const PARAMETERS_THROWING_EXCEPTION = [2, "a"];
export const PARAMETERS_WITH_SIDE_EFFECT = [3, "b"];

export const ParameterTestData = {
  default: () => makeGetters(PARAMETERS) as [() => number, () => string],
  defaultFirst: () => PARAMETERS[0] as number,
  returnvalueGetter: () => () => "1",
  defaultSecond: () => PARAMETERS[1] as string,
  defaultSimple: () => PARAMETERS,
  throwingSimple: () => PARAMETERS_THROWING_EXCEPTION,
  exceptionThrowing: () =>
    makeGetters(PARAMETERS_THROWING_EXCEPTION) as [() => number, () => string],
  withSideEffects: () =>
    makeGetters(PARAMETERS_WITH_SIDE_EFFECT) as [() => number, () => string],
  checker: () => {
    return {
      check: ReturnValueCheckTestData.passing(),
      default: ParameterTestData.returnvalueGetter(),
    };
  },
};
