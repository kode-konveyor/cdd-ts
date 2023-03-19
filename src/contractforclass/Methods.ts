import { MethodType } from "../types/MethodType.js";

export type Methods<T> = {
    [Key in keyof T]: T[Key] extends MethodType ? Key : never;
}[keyof T];
