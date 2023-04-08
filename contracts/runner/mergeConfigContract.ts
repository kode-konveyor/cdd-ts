import { Contract } from "../../src/contract/Contract.js";
import { mergeConfig } from "../../src/runner/mergeConfig.js";
import { ConsoleLogChecker } from "../../src/util/ConsoleLogChecker.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { PatternTestData } from "../../testdata/PatternTestData.js";

export const mergeConfigContractParties = [mergeConfig];
export const mergeConfigContract = new Contract<typeof mergeConfig>()
  .setTitle(
    "gathers the configuration from the default config, config file and command line parameters"
  )

  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfiguration,
    CDDConfigurationTestData.getCDDConfigurationES,
    CDDConfigurationTestData.defaultConfig
  )
  .meanwhile(
    "if debug is not given, does not print the config to stdout",
    new ConsoleLogChecker(PatternTestData.emptystdout)
  )
  .thenReturn(
    "merges the configurations into one",
    CDDConfigurationTestData.defaultConfig
  )

  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfiguration,
    CDDConfigurationTestData.getCDDConfigurationES,
    CDDConfigurationTestData.debug
  )
  .meanwhile(
    "if debug is given, prints the config to stdout",
    new ConsoleLogChecker(PatternTestData.mergeConfig)
  )
  .thenReturn(
    "merges the configurations into one",
    CDDConfigurationTestData.debug
  );