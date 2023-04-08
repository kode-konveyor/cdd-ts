import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { MethodType } from "../types/MethodType.js";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages.js";
import { CaseName } from "./CaseName.js";

export class OneSideEffectCheck<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(readonly caseName = CaseName.prototype.caseName) {
    super();
  }

  oneSideEffectCheck() {
    return (entry: [string, SideEffectCheckerType]) => {
      try {
        entry[1].check();
      } catch (error) {
        entry[1].tearDown();
        throw new Error(
          messageFormat(
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
