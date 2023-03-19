#!/usr/bin/env node

import { runAllContracts } from "./runner/runAllContracts.js";
import { ContractRunnerOptions } from "./types/ContractRunnerOptions.js";
import glob from "fast-glob" 
import fs from "node:fs"
import url from 'url';
import child_process from 'child_process';

const myPath = url.fileURLToPath(import.meta.url);


const options:ContractRunnerOptions = {
    watch: false
}
if(process.argv[2] === "-w") {
    options.watch = true
}

if(options.watch) {
    console.log("watching")
    glob(['dist/**/*.js'],{})
    .then((files) => {
        for(const file of files) {
            fs.watch(file,() => {
                console.log("running contracts because ",file)
                child_process.fork(myPath)
            })
        }
    })
    .catch(reason => console.log(reason))
    void runAllContracts(options)
} else {
    void runAllContracts(options)
}

