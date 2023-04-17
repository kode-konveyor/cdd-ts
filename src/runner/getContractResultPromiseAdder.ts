import { type MethodType } from "../types/MethodType.js";
import { type Contract } from "../contract/Contract.js";

export function getContractResultPromiseAdder(contract: Contract<MethodType>) {
  return async function adder(
    prev: Promise<number>,
    party: MethodType
  ): Promise<number> {
    const res = await contract.check(party);
    const prevValue = await prev;
    return prevValue + res;
  };
}
