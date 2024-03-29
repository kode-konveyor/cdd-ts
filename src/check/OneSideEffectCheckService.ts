import { ContractEntity } from "../types/ContractEntity.js";
import { type SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { type MethodType } from "../types/MethodType.js";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages.js";
import { CaseNameService } from "./CaseNameService.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { type PromisedReturnType } from "../types/PromisedReturnType.js";

export class OneSideEffectCheckService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(
    readonly caseName = CaseNameService.prototype.caseName,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  async oneSideEffectCheck(
    name: string,
    checker: SideEffectCheckerType<T>,
    result: PromisedReturnType<T>,
    parameters: Parameters<T>
  ): Promise<void> {
    try {
      await checker.check(result, ...parameters);
    } catch (error) {
      if (checker.tearDown !== undefined) await checker.tearDown();
      throw new Error(
        this.messageFormat(
          SIDE_EFFECT_CHECK_FAILURE_MESSAGE,
          this.caseName(),
          name,
          String(error)
        )
      );
    }
  }
}
