export type Unpromised<T extends (...args: Array<any>) => Promise<unknown>> = (
  ...args: Parameters<T>
) => ReturnType<T> extends Promise<infer S> ? S : never;
