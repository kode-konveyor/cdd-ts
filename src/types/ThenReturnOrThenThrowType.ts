import { type MethodType } from "../types/MethodType.js";
import { type ThenReturnService } from "../contract/ThenReturnService.js";
import { type ThenThrowService } from "../contract/ThenThrowService.js";

export interface ThenReturnOrThenThrowType<T extends MethodType> {
  thenReturn: ThenReturnService<T>["thenReturn"];
  thenThrow: ThenThrowService<T>["thenThrow"];
}
