import { MethodType } from "../types/MethodType";

export type Methods<T> = {
    [Key in keyof T]: T[Key] extends MethodType ? Key : never;
}[keyof T];
