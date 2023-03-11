import { Contract } from "../contract/Contract";
import { SutType } from "../contract/SutType";
import { Methods } from "./Methods";

export type ContractsFor<T> = {
    [K in Methods<T>]: T[K] extends SutType ? Contract<T[K]> : never;
};
