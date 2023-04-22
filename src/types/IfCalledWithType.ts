import { type MethodType } from "./MethodType.js";
import { type IfCalledWithService } from "../contract/IfCalledWithService.js";

export interface IfCalledWithType<T extends MethodType> {
  ifCalledWith: IfCalledWithService<T>["ifCalledWith"];
}
