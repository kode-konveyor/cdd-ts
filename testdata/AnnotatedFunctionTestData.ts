import { bound } from "../src/cdd-ts.js";
import { type CDDConfiguration } from "../src/types/CDDConfiguration";
import { MakeGettersService } from "../src/util/MakeGettersService.js";
import { CDDConfigurationTestData } from "./CDDConfigurationTestData.js";

const makeGetters =
  bound<MakeGettersService["makeGetters"]>(MakeGettersService);

export const AnnotatedFunctionTestData = {
  default: (): (() => CDDConfiguration) =>
    CDDConfigurationTestData.getCDDConfiguration,
  getter: () => makeGetters([1])[0] as () => number,
};
