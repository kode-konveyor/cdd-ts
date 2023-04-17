import { type CDDConfiguration } from "../types/CDDConfiguration";
import { deepCopy } from "../util/deepCopy.js";
import { StoreConfigService } from "./StoreConfigService.js";

export class MergeConfigService {
  constructor(readonly storeConfig = StoreConfigService.prototype.storeConfig) {
    this.mergeConfig = this.mergeConfig.bind(this);
  }

  mergeConfig(
    defaultConfig: CDDConfiguration,
    configFromFile: CDDConfiguration,
    options: CDDConfiguration
  ): CDDConfiguration {
    const theConfig = deepCopy(defaultConfig);

    this.storeConfig(configFromFile, theConfig);
    this.storeConfig(options, theConfig);
    if (theConfig.debug) console.log(theConfig);

    return theConfig;
  }
}
