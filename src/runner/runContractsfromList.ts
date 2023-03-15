import { Contract } from "../cdd-ts";
import { MethodType } from "../contract/MethodType";
import { messageFormat } from "../util/messageFormat";
import { readFileSync } from "fs"
import {relative} from "path"

interface CDDConfiguration {
    jsDir: string
}
const config: CDDConfiguration = JSON.parse(readFileSync("cdd-ts.json").toString())

const myPath = module.path

export function runContractsfromList(contracts: string[]): Array<Promise<number>> {
    const promises: Array<Promise<number>> = []
    contracts.forEach((contractFile) => {
        const baseName = contractFile.split('/').pop();
        const contractName = (baseName as string).replace(".ts", "");
        promises.push(runOneContract(contractFile, contractName));
    });
    return promises
}

async function runOneContract(contractFile: string, contractName: string): Promise<number> {
    try {
        const modulePath =  relative(myPath, config.jsDir)+'/' + contractFile.replace(".ts", ".js");
        const modulePromise = import(modulePath);
        const module = await modulePromise;
        const contract: Contract<MethodType> = module[contractName];
        if (contract === undefined)
            throw new Error(messageFormat("{1}:{2}: undefined", contractFile, contractName))
        const parties: [] = module[contractName + "Parties"]
        if (parties === undefined)
            throw new Error(messageFormat("{1}:{2}: undefined", contractFile, contractName + "Parties"))
        let count = 0
        for (const party of parties) {
            count += contract.check(party)
        }
        return count;
    } catch (e) {
        throw e
    }
}

