#!/usr/bin/env node

import { runAllContracts } from "./runner/runAllContracts";

runAllContracts()
.then((value:number) =>
    console.log("made "+ value.toString()+ " contract checks"))
.catch((reason:any)=>
    console.log(reason))
