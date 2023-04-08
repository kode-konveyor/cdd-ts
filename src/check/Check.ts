import { HandleRun } from "./HandleRun.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { nullPromise } from "../runner/nullPromise.js";
import { Mutex } from "../util/Mutex.js";
import { CaseName } from "./CaseName.js";
import { CheckReturnValue } from "./CheckReturnValue.js";
import { HandleException } from "./HandleException.js";
import { OneSideEffectCheck } from "./OneSideEffectCheck.js";
import { RunReturnValueChecks } from "./RunReturnValueChecks.js";
import { RunSideEffectChecks } from "./RunSideEffectChecks.js";

const mutex = new Mutex();

const NO_CHECKS_IN_CONTRACT = "no checks in contract {1}";
export class Check<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly handleRun = HandleRun.prototype.handleRun,
    readonly handleException = HandleException.prototype.handleException,
    readonly caseName = CaseName.prototype.caseName,
    readonly oneSideEffectCheck = OneSideEffectCheck.prototype
      .oneSideEffectCheck,
    readonly runSideEffectChecks = RunSideEffectChecks.prototype
      .runSideEffectChecks,
    readonly runReturnValueChecks = RunReturnValueChecks.prototype
      .runReturnValueChecks,
    readonly checkReturnValue = CheckReturnValue.prototype.checkReturnValue
  ) {
    super();
  }

  async check(sut: T): Promise<number> {
    let checked: number = 0;
    if (this.currentRun != null) {
      const currentCase = this.currentCase != null ? this.currentCase : "";
      if (this.cases[currentCase] === undefined) {
        this.cases[currentCase] = new CaseDescriptorEntity();
      }
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      (this.cases[currentCase] as CaseDescriptorEntity<T>).runs.push(
        this.currentRun
      );
      delete this.currentRun;
    }
    for (const casename in this.cases) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const thisCase: CaseDescriptorEntity<T> = this.cases[
        casename
      ] as CaseDescriptorEntity<T>;
      this.checkedCase = casename;
      try {
        if (casename !== "") await mutex.lock();
        if (thisCase.setUp != null) {
          await thisCase.setUp();
        }
        checked += await thisCase.runs.reduce(async (prev, current) => {
          const currentResult = await this.handleRun(current, sut);
          const previous = await prev;
          return previous + currentResult;
        }, nullPromise);
        if (thisCase.tearDown != null) {
          thisCase.tearDown();
        }
      } catch (e) {
        if (casename !== "") mutex.unlock();
        throw e;
      }
      if (casename !== "") mutex.unlock();
    }
    if (checked === 0) {
      throw new Error(messageFormat(NO_CHECKS_IN_CONTRACT, this.explanation));
    }
    return checked;
  }
}
