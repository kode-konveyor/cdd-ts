import { type ContractEntity } from "./ContractEntity.js";
import { type MethodType } from "./MethodType.js";

export type CallType<
  T extends MethodType,
  mixin extends MethodType,
  THIS extends ContractEntity<T>
> = (contract: THIS) => ReturnType<mixin>;
