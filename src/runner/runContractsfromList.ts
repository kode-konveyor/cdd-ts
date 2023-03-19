import { readFileSync } from "fs"
import { runOneContract } from "./runOneContract.js";
import url from 'url';

interface CDDConfiguration {
    jsDir: string
}
export const config: CDDConfiguration = JSON.parse(readFileSync("cdd-ts.json").toString())


export const myPath = url.fileURLToPath(import.meta.url);

export async function runContractsfromList(contracts: Array<string>): Promise<number> {
    try {
        const nullPromise = new Promise<number>((resolve) => resolve(0));
    return await contracts.reduce(
        async (prev,contractFile):Promise<number> => {
            try {
                const baseName = contractFile.split('/').pop();
                const contractName = (baseName as string).replace(".ts", "");
                const previous = await prev;
                const current = await runOneContract(contractFile, contractName);
                return previous + current;
            } catch (e) {
                throw e
            }
        },
        nullPromise
    );
    } catch (e) {
        throw e
    }
}


