import { ANNOTATED_FUNCTION_FORMAT } from "./Constants.js";
import { MessageFormatService } from "./messageFormat.js";
import { serialize } from "./serialize.js";

export class AnnotateFunctionService {
  constructor(
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {}

  annotateFunction<T extends () => unknown>(fun: T): T {
    const rr = fun as unknown as { displayName: string };
    const data = fun();
    rr.displayName = this.messageFormat(
      ANNOTATED_FUNCTION_FORMAT,
      serialize(data)
    );
    return fun;
  }
}
