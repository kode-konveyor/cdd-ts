import { type AsGetters } from "../src/typefunctions/AsGetters.js";

export function getFormatParametersList(): Array<() => string> {
  return [() => "hihi", () => "hehe"];
}
export function getFormatParametersStructured(): {
  egyik: string;
  masik: string;
} {
  return {
    egyik: "hihi",
    masik: "hehe",
  };
}

const DID_NOT_PASS = "did not pass";
export const FormatStringTestData = {
  default: () => "{1}: {2}",
  multiple: () => "{egyik}: {masik}{egyik}",
  referencing: () => "{egyik}: {masik}",
  formatted: () => "hihi: hehe",
  formattedMultiple: () => "hihi: hehehihi",
  parametersAsListOne: () => "hihi",
  parametersAsListTwo: () => "hehe",
  parametersAsObject: () => {
    return {
      egyik: "hihi",
      masik: "hehe",
    };
  },
  currentRunIsInComplete: () =>
    "{1}: current run is incomplete: neither thenReturn nor thenThrow was called",
  defaultCasereference: () => "The function under test:undefined:undefined",
  currentRunIsIncompleteMessage: () =>
    "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called",
  didNotPassChecker: {
    default: [
      () => "the parameter did not pass the check: {1}",
      () => '"b"',
    ] as AsGetters<[string, string]>,
    checker: (...params: Array<unknown>) =>
      (params[0] as string).match(DID_NOT_PASS) != null && params[1] === '"b"'
        ? undefined
        : params,
  },
  didNotPassMessage: () => 'the parameter did not pass the check: "b"',
};
