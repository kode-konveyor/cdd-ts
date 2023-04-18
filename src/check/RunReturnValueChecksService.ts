import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { CaseNameService } from "./CaseNameService.js";
import { RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT } from "./Messages.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MessageFormatService } from "../util/messageFormat.js";

export class RunReturnValueChecksService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    readonly caseName = CaseNameService.prototype.caseName,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  runReturnValueChecks(
    currentRun: RunDescriptorEntity<T>,
    result: ReturnType<T>,
    parameters: Parameters<T>
  ): void {
    currentRun.returnValueChecks.forEach((entry) => {
      try {
        const checkResult = entry[1](result, ...parameters);
        if (checkResult !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw checkResult;
        }
      } catch (error) {
        throw new Error(
          this.messageFormat(
            RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT,
            this.caseName(),
            entry[0],
            String(error),
            String((error as Error).stack)
          )
        );
      }
    });
  }
}
