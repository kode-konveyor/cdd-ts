import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { GetStubService } from "./GetStubService.js";

// eslint-disable-next-line kodekonveyor/service
type OmitFirtsParameter<T extends MethodType> = Parameters<T> extends [
  unknown,
  ...infer R
]
  ? R
  : never;

export class GetStubForMixinService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(readonly getStub = GetStubService.prototype.getStub) {
    super();
  }

  getStubForMixin(): (...params: OmitFirtsParameter<T>) => ReturnType<T> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return function (this: Parameters<T>[0], ...params: OmitFirtsParameter<T>) {
      return self.getStub()(this, ...params);
    };
  }
}
