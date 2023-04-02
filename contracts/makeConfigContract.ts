import { Contract } from "../src/contract/Contract.js";
import { mergeConfig } from "../src/runner/mergeConfig.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";


export const makeConfigContractParties = [mergeConfig]
export const makeConfigContract = new Contract<typeof mergeConfig>()
    .setTitle("gathers the configuration from the default config, config file and command line parameters")
    .ifCalledWith(CDDConfigurationTestData.getCDDConfiguration,CDDConfigurationTestData.getCDDConfigurationES,CDDConfigurationTestData.defaultConfig)
    .thenReturn("merges the configurations into one",CDDConfigurationTestData.defaultConfig)