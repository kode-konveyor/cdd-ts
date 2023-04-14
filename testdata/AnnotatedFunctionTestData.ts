import { type CDDConfiguration } from "../src/types/CDDConfiguration";
import { makeGetters } from "../src/util/makeGetters.js";
import { CDDConfigurationTestData } from "./CDDConfigurationTestData.js";

export const AnnotatedFunctionTestData = {
  default: (): (() => CDDConfiguration) =>
    CDDConfigurationTestData.getCDDConfiguration,
  getter: () => makeGetters([1])[0],
};
