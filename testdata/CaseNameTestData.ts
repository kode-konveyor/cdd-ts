const DEFAULT_IDENTIFIER = "The function under test:undefined:undefined";
export const CaseNameTestData = {
  nonDefaultCase: () =>
    "The function under test:Global multiplier is 3:run explanation",
  undefined: () => "undefined:undefined:undefined",
  default: () => DEFAULT_IDENTIFIER,
};
