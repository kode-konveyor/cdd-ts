import { ContractEntity } from "../types/ContractEntity.js";
import { type SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { type MethodType } from "../types/MethodType.js";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages.js";
import { CaseNameService } from "./CaseNameService.js";
import { MessageFormatService } from "../util/messageFormat.js";

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

  oneSideEffectCheck() {
    return (entry: [string, SideEffectCheckerType]) => {
      try {
        entry[1].check();
      } catch (error) {
        entry[1].tearDown();
        throw new Error(
          this.messageFormat(
            SIDE_EFFECT_CHECK_FAILURE_MESSAGE,
            this.caseName(),
            entry[0],
            String(error)
          )
        );
      }
      entry[1].tearDown();
    };
  }
}
