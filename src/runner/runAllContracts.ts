import { runContractsfromList } from "./runContractsfromList";

import glob from "fast-glob" 

export async function runAllContracts(): Promise<number> {
    const dir = process.cwd();
    try {
        const contracts = await glob(['contracts/**/*Contract.ts'],{})
        const promises = runContractsfromList(contracts, dir);
        const counts = await Promise.all(promises);
        let count = 0;
        for (const oneCount of counts) {
            count += oneCount;
        }
        return count
    } catch(e) {
        throw e
    }
}

