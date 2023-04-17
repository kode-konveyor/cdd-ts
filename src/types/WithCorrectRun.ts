import { type ContractEntity } from "./ContractEntity.js";
import { type MethodType } from "./MethodType.js";
import { type RunDescriptorEntity } from "./RunDescriptorEntity.js";

export type WithCorrectRun<
  T extends MethodType,
  K extends ContractEntity<T>
> = K & Required<{ currentRun: RunDescriptorEntity<T> }>;
