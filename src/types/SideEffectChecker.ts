import { type MethodType } from "./MethodType.js";
import { type PromisedReturnType } from "./PromisedReturnType.js";

export interface SideEffectCheckerType<T extends MethodType> {
  setUp?: (() => void) | (() => Promise<void>);
  check:
    | ((result: PromisedReturnType<T>, ...parameters: Parameters<T>) => void)
    | ((
        result: PromisedReturnType<T>,
        ...parameters: Parameters<T>
      ) => Promise<void>);
  tearDown?: (() => void) | (() => Promise<void>);
}
