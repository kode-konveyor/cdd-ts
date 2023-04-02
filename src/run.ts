#!/usr/bin/env node

import { runAllContracts } from "./runner/runAllContracts.js";
import glob from "fast-glob" 
import fs from "node:fs"
import url from 'url';
import child_process from 'child_process';
import "@angular/compiler"
import { mkargv } from "./runner/mkargv.js";
import { argparser } from "./runner/argparser.js";
import { defaultConfig } from "./runner/defaultConfig.js";
import { configFromFile } from "./runner/configFromFile.js";
import { mergeConfig } from "./runner/mergeConfig.js";
import { checkNumberOfTests } from "./runner/checkNumberOfTests.js";
import { program } from "commander";
import { CDDConfiguration } from "./types/CDDConfiguration.js";

const myPath = url.fileURLToPath(import.meta.url);
argparser.parse(process.argv);
const options: CDDConfiguration = program.opts();

export const config = mergeConfig(defaultConfig, configFromFile, options)

if(config.watch) {
    if(config.debug)
        console.log("watching", config.distFiles)
    glob(config.distFiles,{})
    .then((files) => {
        for(const file of files) {
            fs.watch(file,() => {
                console.log("running contracts because",file)
                child_process.fork(myPath,mkargv(config))
            })
        }
    })
    .catch(reason => console.log(reason))
    const tested = await runAllContracts(config)
    if(!checkNumberOfTests(config,tested))
        process.exit(-1)
}else {
    const tested = await runAllContracts(config)
    if(!checkNumberOfTests(config,tested))
        process.exit(-1)
}


