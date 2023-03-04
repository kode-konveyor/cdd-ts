import { runContractsfromList } from "./runContractsfromList";

import glob from "fast-glob" 

export async function runAllContracts() {
    const dir = process.cwd();
    const foo = glob
    const contracts =  await glob(['contracts/**/*Contract.ts'],{});
    const results = await runContractsfromList(contracts, dir);
    return results
}

