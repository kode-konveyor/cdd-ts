import { LabelTestdata } from "./LabelTestdata.js";
import { ReturnValueCheckTestData } from "./ReturnValueCheckTestData.js";

export const ReturnValueCheckCaseTestData = {
  passing: () =>
    [LabelTestdata.pass(), ReturnValueCheckTestData.passing()] as [
      string,
      () => undefined
    ],
  failig: () =>
    [LabelTestdata.fail(), ReturnValueCheckTestData.failing()] as [
      string,
      () => string
    ],
};
