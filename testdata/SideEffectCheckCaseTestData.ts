import { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { LabelTestdata } from "./LabelTestdata.js";
import { SideEffectCheckerTestData } from "./SideEffectCheckerTestData.js";

export const SideEffectCheckCaseTestData = {
  default: () =>
    [LabelTestdata.logsToConsole(), SideEffectCheckerTestData.default()()] as [
      string,
      SideEffectCheckerType
    ],
  failing: () =>
    [LabelTestdata.logsToConsole(), SideEffectCheckerTestData.failing()()] as [
      string,
      SideEffectCheckerType
    ],
};
