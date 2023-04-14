import { type RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { type ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";

import { Mutex } from "../util/Mutex.js";

const sideEffectMutex = new Mutex();

export async function setUpSideEffectChecks<
  T extends MethodType,
  THIS extends ContractEntity<T>
>(this: THIS, currentRun: RunDescriptorEntity<T>): Promise<void> {
  if (currentRun.sideEffectChecks.length !== 0) await sideEffectMutex.lock();
  for (const entry of currentRun.sideEffectChecks) {
    entry[1].setUp();
  }
}

export function tearDownSideEffectChecks<
  T extends MethodType,
  THIS extends ContractEntity<T>
>(this: THIS, currentRun: RunDescriptorEntity<T>): void {
  if (currentRun.sideEffectChecks.length !== 0) sideEffectMutex.unlock();
  for (const entry of currentRun.sideEffectChecks) {
    entry[1].tearDown();
  }
}
