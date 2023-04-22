import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { CaseNameService } from "./CaseNameService.js";
import { RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT } from "./Messages.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { serialize } from "../cdd-ts.js";

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

  async runReturnValueChecks(
    currentRun: RunDescriptorEntity<T>,
    result: ReturnType<T>,
    parameters: Parameters<T>
  ): Promise<void> {
    for (const check of currentRun.returnValueChecks) {
      try {
        const checkResult = await check(result, ...parameters);
        if (checkResult !== undefined) {
          throw new Error(serialize(checkResult));
        }
      } catch (error) {
        throw new Error(
          this.messageFormat(
            RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT,
            this.caseName(),
            serialize(check),
            String(error),
            String((error as Error).stack)
          )
        );
      }
    }
  }
}
