import { ContractEntity } from "../types/ContractEntity.js"
import { MethodType } from "../types/MethodType.js"
import { GetStub } from "./GetStub.js"

export class GetStubForMixin<T extends MethodType> extends ContractEntity<T> {

    constructor(
        readonly getStub = GetStub.prototype.getStub
    ) {
        super()
    }

    getStubForMixin<KLASS>(): (this: KLASS, ...params: Parameters<T>) => ReturnType<T> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this
        return function (this: KLASS,...params: Parameters<T>) {
            return self.getStub()(this, ...params)
        }
    }
}