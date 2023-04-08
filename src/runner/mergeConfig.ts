import { CDDConfiguration } from "../types/CDDConfiguration";
import { deepCopy } from "../util/deepCopy.js";
import { storeConfig } from "./storeConfig.js";

export function mergeConfig(
  defaultConfig: CDDConfiguration,
  configFromFile: CDDConfiguration,
  options: CDDConfiguration
): CDDConfiguration {
  const theConfig = deepCopy(defaultConfig);

  storeConfig(configFromFile, theConfig);
  storeConfig(options, theConfig);
  if (theConfig.debug) console.log(theConfig);

  return theConfig;
}
