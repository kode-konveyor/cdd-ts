import { Check } from "src/check/Check";
import { Contract } from "src/contract/Contract";
import { container } from "tsyringe";

export function runContractsfromList(contracts: string[], dir: string) {
    let promises: Promise<number>[] = []
    contracts.forEach(  (contractFile) => {
        const baseName = contractFile.split('/').pop();
        const contractName = (baseName as string).replace(".ts", "");
        promises.push(runOneContract(dir, contractFile, contractName));
    });
    return promises
}
async function runOneContract(dir: string, contractFile: string, contractName: string) {
    const modulePromise = import(dir + "/" + contractFile);
    try {
        const module = await modulePromise;
        const contract: Contract<any> = module[contractName];
        const parties:[] = module[contractName+"Parties"]
        let count = 0
        for(const party of parties) {
            count += container.resolve(Check).check(contract,party)
        }
        return count as number;
    } catch (e) {
        throw e
    }
}

