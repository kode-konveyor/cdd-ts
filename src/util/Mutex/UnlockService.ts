import { MutexEntity } from "./MutexEntity.js";

export class UnlockService extends MutexEntity {
  unlock(): void {
    (this._unlock as () => void)();
  }
}
