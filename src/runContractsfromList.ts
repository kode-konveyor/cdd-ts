import {BeThat} from "./BeThat"
import { Check } from "./Check";

export async function runContractsfromList(contracts: string[], dir: string) {
    let promises: Promise<number>[] = []
    contracts.forEach(  (contractFile) => {
        const baseName = contractFile.split('/').pop();
        if (!baseName)
            throw new Error(contractFile);
        const contractName = baseName.replace(".ts", "");
        console.log("running "+ contractName)
        promises.push(runOneContract(dir, contractFile, contractName));
    });
    let count = 0
    for(const countPromise of promises) {
        count += await countPromise
    }
    return count
}
async function runOneContract(dir: string, contractFile: string, contractName: string) {
    const modulePromise = import(dir + "/" + contractFile);
    const module = await modulePromise;
    const contract: Check<any> = module[contractName];
    return contract.check() as number;
}

