import { CDDConfiguration } from "../../src/runner/config.js";
import { JS_DIR } from "./CDDConfigurationTestData.js";
import { getCDDConfiguration } from "./getCDDConfiguration.js";

export function getCDDConfigurationES(): CDDConfiguration {
    const cDDConfiguration = getCDDConfiguration();
    cDDConfiguration.moduleResolution = "ES";
    cDDConfiguration.jsDir = JS_DIR;
    return cDDConfiguration;
}
