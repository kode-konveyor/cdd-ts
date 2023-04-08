import { CDDConfiguration } from "../types/CDDConfiguration.js";
import { runOneContract } from "./runOneContract.js";

export async function runContractsfromList(config: CDDConfiguration, contracts: Array<string>): Promise<number> {
    const sum = await contracts.reduce(
        async (prev, contractFile): Promise<number> => {
            const baseName = contractFile.split('/').pop();
            const contractName = (baseName as string).replace(".ts", "");
            const previous = await prev;
            const current = await runOneContract(config, contractFile, contractName);
            return previous + current;
        },
        new Promise<number>((resolve) => resolve(0))
    );
    return sum;
}


