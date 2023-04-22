import { type IfCalledWithService } from "../contract/IfCalledWithService.js";
import { type MethodType } from "./MethodType.js";

export interface WhenServiceResultType<T extends MethodType> {
  ifCalledWith: IfCalledWithService<T>["ifCalledWith"];
}
