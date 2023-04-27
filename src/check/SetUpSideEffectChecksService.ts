import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { sideEffectMutex } from "./Constants.js";

export class SetUpSideEffectChecksService {
  async setUpSideEffectChecks<T extends MethodType>(
    currentRun: RunDescriptorEntity<T>
  ): Promise<void> {
    if (currentRun.sideEffectChecks.length !== 0) await sideEffectMutex.lock();
    for (const entry of currentRun.sideEffectChecks) {
      if (entry[1].setUp !== undefined) await entry[1].setUp();
    }
  }
}
