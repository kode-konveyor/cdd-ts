import { LockService } from "./LockService.js";
import { MutexEntity } from "./MutexEntity.js";
import { UnlockService } from "./UnlockService.js";

export class Mutex extends MutexEntity {
  constructor(
    readonly lock = LockService.prototype.lock,
    readonly unlock = UnlockService.prototype.unlock
  ) {
    super();
    this.lock = lock.bind(this);
  }
}
