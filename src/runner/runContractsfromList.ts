import { CDDConfiguration } from "../types/CDDConfiguration.js";
import { runOneContract } from "./runOneContract.js";

export async function runContractsfromList(config: CDDConfiguration, contracts: Array<string>): Promise<number> {
    return await contracts.reduce(
        async (prev,contractFile):Promise<number> => {
            try {
                const baseName = contractFile.split('/').pop();
                const contractName = (baseName as string).replace(".ts", "");
                const previous = await prev;
                const current = await runOneContract(config, contractFile, contractName);
                return previous + current;
            } catch (e) {
                throw e
            }
        },
        new Promise<number>((resolve) => resolve(0))
    );
}


