import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { IFCALLEDWITH_MISSING } from "./Messages.js";

export class ThrowIfCalledWithMissingForService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  throwIfCalledWithMissingFor(functionName: string): never {
    throw new Error(this.messageFormat(IFCALLEDWITH_MISSING, functionName));
  }
}
