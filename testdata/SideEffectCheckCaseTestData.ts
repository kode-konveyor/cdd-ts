import { type SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { LabelTestdata } from "./LabelTestdata.js";
import { type TestedFunctionType } from "./MethodTestData.js";
import { SideEffectCheckerTestData } from "./SideEffectCheckerTestData.js";

export const SideEffectCheckCaseTestData = {
  default: () =>
    [LabelTestdata.logsToConsole(), SideEffectCheckerTestData.default()()] as [
      string,
      SideEffectCheckerType<TestedFunctionType>
    ],
  failing: () =>
    [LabelTestdata.logsToConsole(), SideEffectCheckerTestData.failing()()] as [
      string,
      SideEffectCheckerType<TestedFunctionType>
    ],
  failingWithoutTearDown: () =>
    [
      LabelTestdata.logsToConsole(),
      SideEffectCheckerTestData.failingWithoutTearDown()(),
    ] as [string, SideEffectCheckerType<TestedFunctionType>],
};
