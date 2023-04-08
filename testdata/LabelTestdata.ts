import { EXCEPTION_THROWN } from "./MethodTestData.js";

export const RUN_EXPLANATION = "run explanation";
export const CONTRACT_EXPLANATION = "The function under test";
export const RUN_IDENTIFICATION = "The function under test::run explanation:";
export const NONDEFAULT_CASE_NAME = "Global multiplier is 3";

export const LabelTestdata = {
  default: () => CONTRACT_EXPLANATION,
  caseName: () => NONDEFAULT_CASE_NAME,
  exceptionThrown: () => EXCEPTION_THROWN,
  runExplanation: () => RUN_EXPLANATION,
  pass: () => "pass",
  fail: () => "fail",
  logsToConsole: () => "logs to console",
  failingSideEffectCheck: () => "failing sideEffectCheck",
  nondefaultCaseName: () => NONDEFAULT_CASE_NAME,
  undefined: () => undefined,
  runIdentification: () => RUN_IDENTIFICATION,
};
