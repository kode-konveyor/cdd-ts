import { MethodType } from "./MethodType";

type AsGetters<T extends any[], converted extends any[] =[]> = T extends [infer head, ... infer tail]
    ? tail extends [never]
        ? never
        : AsGetters<tail, [... converted, () => head]>
    : converted

export type ParameterGetters<T extends MethodType> = AsGetters<Parameters<T>>

