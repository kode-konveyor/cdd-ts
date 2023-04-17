import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { GetStubService } from "./GetStubService.js";

export class GetStubForMixinService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(readonly getStub = GetStubService.prototype.getStub) {
    super();
  }

  getStubForMixin<KLASS>(): (
    this: KLASS,
    ...params: Parameters<T>
  ) => ReturnType<T> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return function (this: KLASS, ...params: Parameters<T>) {
      return self.getStub()(this, ...params);
    };
  }
}
