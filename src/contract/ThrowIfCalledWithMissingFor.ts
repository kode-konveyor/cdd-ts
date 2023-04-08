import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";

const IFCALLEDWITH_MISSING = "ifCalledWith is missing before {1}";
export class ThrowIfCalledWithMissingFor<
  T extends MethodType
> extends ContractEntity<T> {
  throwIfCalledWithMissingFor(functionName: string): never {
    throw new Error(messageFormat(IFCALLEDWITH_MISSING, functionName));
  }
}
