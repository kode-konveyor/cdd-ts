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
import { makeConfig } from "./runner/makeConfig.js";
import { checkNumberOfTests } from "./runner/checkNumberOfTests.js";

const myPath = url.fileURLToPath(import.meta.url);

export const config = makeConfig(process.argv,argparser, defaultConfig, configFromFile)

if(config.watch) {
    if(config.debug)
        console.log("watching", config.distFiles)
    glob(config.distFiles,{})
    .then((files) => {
        for(const file of files) {
            fs.watch(file,() => {
                console.log("running contracts becausea ",file)
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


