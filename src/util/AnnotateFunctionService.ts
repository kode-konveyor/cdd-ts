import { ANNOTATED_FUNCTION_FORMAT } from "./Constants.js";
import { messageFormat } from "./messageFormat.js";
import { serialize } from "./serialize.js";

export class AnnotateFunctionService {
  annotateFunction<T extends () => unknown>(fun: T): T {
    const rr = fun as unknown as { displayName: string };
    const data = fun();
    rr.displayName = messageFormat(ANNOTATED_FUNCTION_FORMAT, serialize(data));
    return fun;
  }
}
