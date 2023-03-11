import { SutType } from "../contract/SutType";

export type Methods<T> = {
    [Key in keyof T]: T[Key] extends SutType ? Key : never;
}[keyof T];
