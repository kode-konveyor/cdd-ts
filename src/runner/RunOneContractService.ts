import { type MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { type Contract } from "../contract/Contract.js";
import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import { ResolveModuleService } from "./ResolveModuleService.js";
import { nullPromise } from "./Constants.js";
import { getContractResultPromiseAdder } from "./getContractResultPromiseAdder.js";
import { PLEASE_EXPORT_CONTRACT, PLEASE_EXPORT_PARTIES } from "./Messages.js";

export class RunOneContractService {
  constructor(
    readonly resolveModule = ResolveModuleService.prototype.resolveModule
  ) {}

  async runOneContract(
    config: CDDConfiguration,
    contractFile: string,
    contractName: string
  ): Promise<number> {
    const modulePath = this.resolveModule(config, contractFile);
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
    const contractResultPromiseAdder = getContractResultPromiseAdder(contract);
    const numChecked = await parties.reduce(
      contractResultPromiseAdder,
      nullPromise
    );
    return numChecked;
  }
}
