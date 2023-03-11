import { Contract } from "../contract/Contract";
import { SutType } from "../contract/SutType";

export function runContractsfromList(contracts: string[], dir: string): Array<Promise<number>> {
    const promises: Array<Promise<number>> = []
    contracts.forEach(  (contractFile) => {
        const baseName = contractFile.split('/').pop();
        const contractName = (baseName as string).replace(".ts", "");
        promises.push(runOneContract(dir, contractFile, contractName));
    });
    return promises
}
async function runOneContract(dir: string, contractFile: string, contractName: string): Promise<number> {
    const modulePromise = import(dir + "/" + contractFile);
    try {
        const module = await modulePromise;
        const contract: Contract<SutType> = module[contractName];
        const parties:[] = module[contractName+"Parties"]
        let count = 0
        for(const party of parties) {
            count += contract.check(party)
        }
        return count ;
    } catch (e) {
        throw e
    }
}

