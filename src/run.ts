#!/usr/bin/env node

import { runAllContracts } from "./runner/runAllContracts.js";
import glob from "fast-glob" 
import fs from "node:fs"
import url from 'url';
import child_process from 'child_process';
import "@angular/compiler"
import { makeConfig, mkargv } from "./runner/config.js";

const myPath = url.fileURLToPath(import.meta.url);

const config = makeConfig()

if(config.debug) {
    console.log(process.argv)
}

if(config.watch) {
    console.log("watching", config.distFiles)
    glob(config.distFiles,{})
    .then((files) => {
        for(const file of files) {
            fs.watch(file,() => {
                console.log("running contracts because ",file)
                child_process.fork(myPath,mkargv())
            })
        }
    })
    .catch(reason => console.log(reason))
    void runAllContracts(config)
}else {
    void runAllContracts(config)
}

