import { CDDConfiguration } from "../../src/runner/config.js";
import { getCDDConfigurationES } from "./getCDDConfigurationES.js";

export function getCDDConfigurationEsbuild(): CDDConfiguration {
    const cDDConfiguration = getCDDConfigurationES();
    cDDConfiguration.moduleResolution = "esbuild";
    return cDDConfiguration;
}
