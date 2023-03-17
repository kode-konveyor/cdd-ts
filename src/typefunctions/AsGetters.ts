
export type AsGettersBetterImplementation<T extends Array<unknown>, converted extends Array<() => unknown> = []> = T extends [infer head, ... infer tail]
    ? AsGettersBetterImplementation<tail, [...converted, () => head]>
    : converted

// export type ParameterGetters<T extends MethodType> = AsGetters<Parameters<T>>

export type AsGetters<T extends Array<unknown>> = {
    [K in keyof T]: () => T[K];
};
