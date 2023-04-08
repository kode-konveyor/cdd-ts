import { messageFormat } from "./messageFormat.js";
import { serialize } from "./serialize.js";

export function annotateFunction<T extends () => unknown>(fun: T): T {
  const rr = fun as unknown as { displayName: string };
  const data = fun();
  rr.displayName = messageFormat("() => {1}", serialize(data));
  return fun;
}
