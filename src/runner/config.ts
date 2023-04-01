import { program } from "commander"
import { readFileSync } from "fs"
import { CDDConfiguration } from "../types/CDDConfiguration"

const configFromFile: CDDConfiguration = JSON.parse(readFileSync("cdd-ts.json").toString())

const config:CDDConfiguration = {
    watch: false,
    distFiles: ['dist/**/*.js'],
    contracts: ['contracts/**/*Contract.ts'],
    jsDir: "dist",
    moduleResolution: "ES",
    debug: false
}

const argparser = program
    .version("1.0.13")
    .description("check the contracts")
    .option("-w, --watch", "watch mode")
    .option("-f, --distFiles [value]", "the files to be watched in watch mode (glob pattern)")
    .option("-c, --contracts [value]", "the contracts (glob pattern)")
    .option("-j, --jsDir <value>", "the js directory used for computing import")
    .option("-m, --moduleResolution <value>","module resolution strategy")
    .option("-d, --debug", "debug")

export function makeConfig():CDDConfiguration {
    argparser.parse(process.argv);

    for(const field in configFromFile) {
        storeConfig(field, configFromFile)
    }
    const options:CDDConfiguration = program.opts()

    for(const field in options) {
        storeConfig(field, options)
    }
    if(config.debug)
        console.log(config)
    return config
}

function storeConfig(field: string, configFromFile: CDDConfiguration):void {
    const configItem: unknown = (configFromFile as unknown as Record<string, unknown>)[field] as string;
    (config as unknown as Record<string, unknown>)[field] = configItem
}

export function mkargv(): Array<string> {
    const args: Array<string> = []
    for(const field in config) {
        if(field === "debug") {
            if(config.debug)
                args.push("-d")
        } else if(field !== "watch") {
            args.push("--"+field)
            args.push((config as unknown as Record<string, string>)[field])
        }
    }
    return args
}
