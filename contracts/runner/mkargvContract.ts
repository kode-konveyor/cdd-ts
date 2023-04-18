import { Contract, bound } from "../../src/cdd-ts.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { ArgvTestData } from "../../testdata/ArgvTestData.js";
import { ConsoleLogChecker } from "../../src/util/ConsoleLogChecker/ConsoleLogChecker.js";
import { PatternTestData } from "../../testdata/PatternTestData.js";
import { MkArgvService } from "../../src/runner/MkArgvService.js";

export const mkargvContractParties = [bound(MkArgvService)];
export const mkargvContract = new Contract<
  typeof MkArgvService.prototype.mkArgv
>()
  .setTitle("makes an argv array out of configuration")

  .ifCalledWith(CDDConfigurationTestData.defaultConfig)
  .meanwhile(
    "if no debug is given, no stdout",
    new ConsoleLogChecker(PatternTestData.emptystdout)
  )
  .thenReturn(
    "returns an array of all parameters in the long form and their argument",
    ArgvTestData.defaultConfig
  )

  .ifCalledWith(CDDConfigurationTestData.debug)
  .meanwhile(
    "if debug is given, prints the argv to stdout",
    new ConsoleLogChecker(PatternTestData.mkArgv)
  )
  .thenReturn("--debug have no argument", ArgvTestData.debug);
