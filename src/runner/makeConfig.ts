import { Command, program } from "commander";
import { CDDConfiguration } from "../types/CDDConfiguration";
import { deepCopy } from "../util/deepCopy.js";
import { storeConfig } from "./storeConfig.js";


export function makeConfig(argv: Array<string>, argparser: Command, defaultConfig: CDDConfiguration, configFromFile: CDDConfiguration): CDDConfiguration {
    const theConfig = deepCopy(defaultConfig);
    argparser.parse(argv);
    const options: CDDConfiguration = program.opts();

    storeConfig(configFromFile, theConfig);
    storeConfig(options, theConfig);

    if (theConfig.debug) {
        console.log(argv);
    }
    if (theConfig.debug)
        console.log(theConfig);

    return theConfig;
}
