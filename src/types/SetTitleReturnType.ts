import { type MethodType } from "./MethodType.js";
import { type IfCalledWithService } from "../contract/IfCalledWithService.js";
import { type WhenService } from "../contract/WhenService.js";

export interface SetTitleReturnType<T extends MethodType> {
  ifCalledWith: IfCalledWithService<T>["ifCalledWith"];
  when: WhenService<T>["when"];
}
