import { type CDDConfiguration } from "../types/CDDConfiguration";
import { DeepCopyService } from "../util/DeepCopyService.js";
import { StoreConfigService } from "./StoreConfigService.js";

export class MergeConfigService {
  constructor(
    readonly storeConfig = StoreConfigService.prototype.storeConfig,
    readonly deepCopy = DeepCopyService.prototype.deepCopy
  ) {}

  mergeConfig(
    defaultConfig: CDDConfiguration,
    configFromFile: CDDConfiguration,
    options: CDDConfiguration
  ): CDDConfiguration {
    const theConfig = this.deepCopy(defaultConfig);

    this.storeConfig(configFromFile, theConfig);
    this.storeConfig(options, theConfig);
    if (theConfig.debug) console.log(theConfig);

    return theConfig;
  }
}
