#!/usr/bin/env node
import { runAllContracts } from "./cdd-ts";

runAllContracts()
.then((value:number) =>
    console.log("made "+ value.toString()+ " contract checks"))
.catch((reason:any)=>
    console.log(reason))
