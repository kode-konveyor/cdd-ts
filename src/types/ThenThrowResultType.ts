import { type CheckService } from "../check/CheckService.js";
import { type MethodType } from "../types/MethodType.js";
import { type GetStubForMixinService } from "../contract/GetStubForMixinService.js";
import { type GetStubService } from "../contract/GetStubService.js";
import { type IfCalledWithService } from "../contract/IfCalledWithService.js";
import { type WhenService } from "../contract/WhenService.js";

export interface ThenThrowResultType<T extends MethodType> {
  ifCalledWith: IfCalledWithService<T>["ifCalledWith"];
  getStub: GetStubService<T>["getStub"];
  getStubForMixin: GetStubForMixinService<T>["getStubForMixin"];
  check: CheckService<T>["check"];
  when: WhenService<T>["when"];
}
