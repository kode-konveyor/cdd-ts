import { Contract } from "../contract/Contract.js";
import { MethodType } from "../types/MethodType.js";
import { Methods } from "./Methods.js";

export type ContractsFor<T> = {
    [K in Methods<T>]: T[K] extends MethodType ? Contract<T[K]> : never;
};
