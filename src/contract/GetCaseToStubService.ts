import { Contract } from "../cdd-ts.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";

export class GetCaseToStubService<
  T extends MethodType
> extends ContractEntity<T> {
  getCaseToStub(): string {
    for (const state of Contract.states) {
      if (state in this.cases) return state;
    }
    return "";
  }
}
