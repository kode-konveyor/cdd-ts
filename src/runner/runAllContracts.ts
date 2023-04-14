import { runContractsfromList } from "./runContractsfromList.js";

import glob from "fast-glob";
import { type CDDConfiguration } from "../types/CDDConfiguration.js";

const NUMBER_OF_CONTRACTS_TESTED = "number of contracts tested: ";
export async function runAllContracts(
  options: CDDConfiguration
): Promise<number> {
  const contracts = await glob(options.contracts, {});
  const count = await runContractsfromList(options, contracts);
  if (count < 1) throw new Error("no contracts tested");
  console.error(NUMBER_OF_CONTRACTS_TESTED, count);
  return count;
}
