import { runContractsfromList } from "./runContractsfromList.js";

import glob from "fast-glob"
import { CDDConfiguration } from "../types/CDDConfiguration.js";

export async function runAllContracts(options: CDDConfiguration): Promise<number> {
    try {
        const contracts = await glob(options.contracts,{})
        const count = await runContractsfromList(options,contracts);
        if(count < 1)
            throw new Error("no contracts tested")
        console.log("number of contracts tested: ",count)
        return count
    } catch(e) {
        if(options.watch) {
            console.log(e)
            return(-1)
        }
        throw e
    }
}

