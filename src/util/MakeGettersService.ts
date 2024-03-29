import { type MethodType } from "../types/MethodType.js";
import { type ParameterGetters } from "../types/ParameterGettersType.js";
import { AnnotateFunctionService } from "./AnnotateFunctionService.js";
import { MessageFormatService } from "./messageFormat.js";

export class MakeGettersService {
  constructor(
    readonly annotateFunction = AnnotateFunctionService.prototype
      .annotateFunction,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {}

  makeGetters<T extends MethodType>(data: Parameters<T>): ParameterGetters<T> {
    return data.map((x) =>
      this.annotateFunction(() => x)
    ) as ParameterGetters<T>;
  }
}
