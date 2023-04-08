import { ContractEntity } from "../src/types/ContractEntity.js";
import { MethodType } from "../src/types/MethodType.js";

export type CallType<
  T extends MethodType,
  mixin extends MethodType,
  THIS extends ContractEntity<T>
> = (contract: THIS) => ReturnType<mixin>;
