import { Contract } from "../contract/Contract";
import { MethodType } from "../contract/MethodType";
import { Methods } from "./Methods";

export type ContractsFor<T> = {
    [K in Methods<T>]: T[K] extends MethodType ? Contract<T[K]> : never;
};
