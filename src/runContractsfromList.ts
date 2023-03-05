import {BeThat} from "./BeThat"
import { Check } from "./Check";

export async function runContractsfromList(contracts: string[], dir: string) {
    let promises: Promise<number>[] = []
    contracts.forEach(  (contractFile) => {
        const baseName = contractFile.split('/').pop();
        const contractName = (baseName as string).replace(".ts", "");
        promises.push(runOneContract(dir, contractFile, contractName));
    });
    const counts= await Promise.all(promises)
    let count = 0
    for(const oneCount of counts) {
        count += oneCount
    }
    return count
}
async function runOneContract(dir: string, contractFile: string, contractName: string) {
    const modulePromise = import(dir + "/" + contractFile);
    const module = await modulePromise;
    const contract: Check<any> = module[contractName];
    return contract.check() as number;
}

