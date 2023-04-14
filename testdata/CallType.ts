import { type ContractEntity } from "../src/types/ContractEntity.js";
import { type MethodType } from "../src/types/MethodType.js";

export type CallType<
  T extends MethodType,
  mixin extends MethodType,
  THIS extends ContractEntity<T>
> = (contract: THIS) => ReturnType<mixin>;
