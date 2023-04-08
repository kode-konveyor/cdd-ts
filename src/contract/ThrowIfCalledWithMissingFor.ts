import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { messageFormat } from "../util/messageFormat.js";


export class ThrowIfCalledWithMissingFor<T extends MethodType> extends ContractEntity<T> {
    throwIfCalledWithMissingFor(functionName: string): never {
        throw new Error(messageFormat("ifCalledWith is missing before {1}", functionName));
    }

}
