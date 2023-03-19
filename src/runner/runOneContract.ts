import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { Contract } from "../contract/Contract.js";
import { resolveModule } from "./resolveModule.js";

export async function runOneContract(contractFile: string, contractName: string): Promise<number> {
    try {
        const modulePath = resolveModule(contractFile);
        const modulePromise = import(modulePath);
        const module = await modulePromise;
        const contract: Contract<MethodType> = module[contractName];
        if (contract === undefined)
            throw new Error(messageFormat("{1}:{2}: please export {2} from {1}", contractFile, contractName));
        const parties: Array<MethodType> = module[contractName + "Parties"];
        if (parties === undefined)
            throw new Error(messageFormat("{1}:{2}: please export {2} from {1}", contractFile, contractName + "Parties"));
        return parties.reduce((prev, party): number => {
            return prev + contract.check(party);
        }, 0);
    } catch (e) {
        throw e;
    }
}

