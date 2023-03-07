import {Contract} from "./Contract"
import { Check } from "./Check";
import { ContractEntity } from "./ContractEntity";

export async function runContractsfromList(contracts: string[], dir: string) {
    let promises: Promise<number>[] = []
    contracts.forEach(  (contractFile) => {
        console.log("running", contractFile)
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
    console.log("runOneContract",[dir,contractFile,contractName])
    const modulePromise = import(dir + "/" + contractFile);
    console.log("modulePromise",modulePromise)
    const module = await modulePromise;
    console.log("module",module)
    const contract: ContractEntity<any> = module[contractName];
    console.log("contract is", contract)
    const parties:[] = module[contractName+"Parties"]
    console.log("parties are", parties)
    let count = 0
    for(const party of parties) {
        const check = new Check()
        count += check.check(contract, party)
    }
    return count as number;
}

