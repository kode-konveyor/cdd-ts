import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import { runOneContract } from "./runOneContract.js";

const PATH_SEPARATOR = "/";
const TYPESCRIPT_EXTENSION = ".ts";
const EMPTY_SPACE = "";
export async function runContractsfromList(
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
      const current = await runOneContract(config, contractFile, contractName);
      return previous + current;
    },
    new Promise<number>((resolve) => {
      resolve(0);
    })
  );
  return sum;
}
