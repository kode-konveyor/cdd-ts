import { runContractsfromList } from "./runContractsfromList.js";

import glob from "fast-glob"
import { ContractRunnerOptions } from "../types/ContractRunnerOptions.js";

export async function runAllContracts(options: ContractRunnerOptions): Promise<number> {
    try {
        const contracts = await glob(['contracts/**/*Contract.ts'],{})
        const count = await runContractsfromList(contracts);
        console.log("number of contracts tested: ",count)
        if(options.watch)
            return count
        process.exit(0)
    } catch(e) {
        if(options.watch) {
            console.log(e)
            return(-1)
        }
        throw e
    }
}

