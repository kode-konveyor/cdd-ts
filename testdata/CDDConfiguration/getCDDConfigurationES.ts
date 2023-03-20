import { CDDConfiguration } from "../../src/runner/config.js";
import { getCDDConfigurationWithJsDir } from "./getCDDConfigurationWithJsDir.js";

export function getCDDConfigurationES(): CDDConfiguration {
    const cDDConfiguration = getCDDConfigurationWithJsDir();
    cDDConfiguration.moduleResolution = "ES";
    return cDDConfiguration;
}

