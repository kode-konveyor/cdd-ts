import { Contract } from "../contract/Contract";
import { ContractsFor } from "./ContractsFor";
import { Methods } from "./Methods";

export class ContractForClass<T extends Record<string, any>> {

    methods!: ContractsFor<T>;

    forMethod<K extends Methods<T>>(methodName: K): Contract<T[K]> {
        return this.methods[methodName]
    }

    setContractForMethod<K extends Methods<T>>(method: K, contract: ContractsFor<T>[K]): void {
        this.methods[method] = contract
    }

}

