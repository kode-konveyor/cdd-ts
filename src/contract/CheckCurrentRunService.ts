import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { CaseNameService } from "../check/CaseNameService.js";
import { messageFormat } from "../util/messageFormat.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { type WithCorrectRun } from "../types/WithCorrectRun.js";
import { CURRENT_RUN_IS_INCOMPLETE } from "../check/Messages.js";

export class CheckCurrentRunService<
  T extends MethodType
> extends ContractEntity<T> {
  constructor(readonly caseName = CaseNameService.prototype.caseName) {
    super();
  }

  checkCurrentRun<T extends MethodType>(): WithCorrectRun<
    T,
    ContractEntity<T>
  > {
    if (this.currentRun !== undefined) {
      if (
        this.currentRun.returnValueGetter === undefined &&
        this.currentRun.thrown == null
      )
        throw new Error(
          messageFormat(CURRENT_RUN_IS_INCOMPLETE, this.caseName())
        );
      const currentCase = this.currentCase != null ? this.currentCase : "";
      if (this.cases[currentCase] == null) {
        this.cases[currentCase] = new CaseDescriptorEntity();
      }
      (this.cases[currentCase] as unknown as CaseDescriptorEntity<T>).runs.push(
        this.currentRun as unknown as RunDescriptorEntity<T>
      );
      this.currentRun = undefined;
    }
    return this as unknown as WithCorrectRun<T, ContractEntity<T>>;
  }
}
