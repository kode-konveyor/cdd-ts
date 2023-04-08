import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { Contract } from "../contract/Contract.js";
import { resolveModule } from "./resolveModule.js";
import { CDDConfiguration } from "../types/CDDConfiguration.js";
import { nullPromise } from "./nullPromise.js";

function getAdder(contract: Contract<MethodType>) {
  return async function adder(
    prev: Promise<number>,
    party: MethodType
  ): Promise<number> {
    const res = await contract.check(party);
    const prevValue = await prev;
    return prevValue + res;
  };
}

const PLEASE_EXPORT_CONTRACT = "{1}:{2}: please export {2} from {1}";
const PLEASE_EXPORT_PARTIES = "{1}:{2}: please export {2}Parties from {1}";
export async function runOneContract(
  config: CDDConfiguration,
  contractFile: string,
  contractName: string
): Promise<number> {
  const modulePath = resolveModule(config, contractFile);
  const modulePromise = import(modulePath);
  const module = await modulePromise;
  const contract: Contract<MethodType> = module[contractName];
  if (contract === undefined)
    throw new Error(
      messageFormat(PLEASE_EXPORT_CONTRACT, contractFile, contractName)
    );
  const parties: Array<MethodType> = module[contractName + "Parties"];
  if (parties === undefined)
    throw new Error(
      messageFormat(PLEASE_EXPORT_PARTIES, contractFile, contractName)
    );
  const numChecked = await parties.reduce(getAdder(contract), nullPromise);
  return numChecked;
}
