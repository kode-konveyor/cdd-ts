import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import {
  PATH_SEPARATOR,
  TYPESCRIPT_EXTENSION,
  EMPTY_SPACE,
} from "./Constants.js";
import { ResolveModuleService } from "./ResolveModuleService.js";
import { RunOneContractService } from "./RunOneContractService.js";

export class RunContractsfromListService {
  constructor(
    readonly resolveModule = ResolveModuleService.prototype.resolveModule,
    readonly runOneContract = RunOneContractService.prototype.runOneContract
  ) {}

  async runContractsfromList(
    config: CDDConfiguration,
    contracts: Array<string>
  ): Promise<number> {
    const sum = await contracts.reduce(
      async (prev, contractFile): Promise<number> => {
        const baseName = contractFile.split(PATH_SEPARATOR).pop();
        const contractName = (baseName as string).replace(
          TYPESCRIPT_EXTENSION,
          EMPTY_SPACE
        );
        const previous = await prev;
        const current = await this.runOneContract(
          config,
          contractFile,
          contractName
        );
        return previous + current;
      },
      new Promise<number>((resolve) => {
        resolve(0);
      })
    );
    return sum;
  }
}
