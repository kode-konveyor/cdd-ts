import { Contract } from "../../src/cdd-ts.js";
import { mkargv } from "../../src/runner/mkargv.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { ArgvTestData } from "../../testdata/ArgvTestData.js";
import { ConsoleLogChecker } from "../../src/util/ConsoleLogChecker.js";
import { PatternTestData } from "../../testdata/PatternTestData.js";

export const mkargvContractParties = [ mkargv ]
export const mkargvContract = new Contract<typeof mkargv>()
    .setTitle("makes an argv array out of configuration")

    .ifCalledWith(CDDConfigurationTestData.defaultConfig)
    .thenReturn("returns an array of all parameters in the long form and their argument", ArgvTestData.defaultConfig)

    .ifCalledWith(CDDConfigurationTestData.debug)
    .thenReturn("--debug have no argument", ArgvTestData.debug)
    .meanwhile("if debug is given, prints the argv to stdout", new ConsoleLogChecker(PatternTestData.mkArgv))
