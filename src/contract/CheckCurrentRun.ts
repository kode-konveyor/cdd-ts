import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { CaseName } from "../check/CaseName.js";
import { messageFormat } from "../util/messageFormat.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";

type WithCorrectRun<T extends MethodType, K extends ContractEntity<T>> = K &
  Required<{ currentRun: RunDescriptorEntity<T> }>;

const CURRENT_RUN_IS_INCOMPLETE =
  "{1}: current run is incomplete: neither thenReturn nor thenThrow was called";
export class CheckCurrentRun<T extends MethodType> extends ContractEntity<T> {
  constructor(readonly caseName = CaseName.prototype.caseName) {
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
