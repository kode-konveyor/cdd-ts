import { AsGetters } from "../typefunctions/AsGetters";
import { MethodType } from "./MethodType";

// makes paramgetters never
// export type ParameterGetters<T extends MethodType> = Extract<AsGetters<Parameters<T>>, Array<()=>unknown>>

// makes (x: () => any) => x() to fail with Type 'unknown' is not assignable to type '() => any'
export type ParameterGetters<T extends MethodType> = Extract<AsGetters<Parameters<T>>, Array<unknown>>

