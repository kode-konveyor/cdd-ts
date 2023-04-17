import { RunContractsfromListService } from "./RunContractsfromListService.js";

import glob from "fast-glob";
import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import { NUMBER_OF_CONTRACTS_TESTED } from "./Messages.js";
import { ResolveModuleService } from "./ResolveModuleService.js";
import { RunOneContractService } from "./RunOneContractService.js";

export class RunAllContractsService {
  constructor(
    readonly runContractsfromList = RunContractsfromListService.prototype
      .runContractsfromList,
    readonly resolveModule = ResolveModuleService.prototype.resolveModule,
    readonly runOneContract = RunOneContractService.prototype.runOneContract
  ) {}

  async runAllContracts(options: CDDConfiguration): Promise<number> {
    const contracts = await glob(options.contracts, {});
    const count = await this.runContractsfromList(options, contracts);
    if (count < 1) throw new Error("no contracts tested");
    console.error(NUMBER_OF_CONTRACTS_TESTED, count);
    return count;
  }
}
