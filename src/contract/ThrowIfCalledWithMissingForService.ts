import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";
import { IFCALLEDWITH_MISSING } from "./Messages.js";

export class ThrowIfCalledWithMissingForService<
  T extends MethodType
> extends ContractEntity<T> {
  throwIfCalledWithMissingFor(functionName: string): never {
    throw new Error(messageFormat(IFCALLEDWITH_MISSING, functionName));
  }
}
