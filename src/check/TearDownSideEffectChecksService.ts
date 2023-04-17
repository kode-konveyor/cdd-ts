import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { sideEffectMutex } from "./Constants.js";

export class TearDownSideEffectChecksService {
  tearDownSideEffectChecks<T extends MethodType>(
    currentRun: RunDescriptorEntity<T>
  ): void {
    if (currentRun.sideEffectChecks.length !== 0) sideEffectMutex.unlock();
    for (const entry of currentRun.sideEffectChecks) {
      entry[1].tearDown();
    }
  }
}
