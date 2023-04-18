import { MutexEntity } from "./MutexEntity.js";

export class LockService extends MutexEntity {
  async lock(): Promise<() => void> {
    let _resolve: () => void;
    const p = new Promise<void>((resolve) => {
      _resolve = () => {
        resolve();
      };
    });
    // eslint-disable-next-line promise/prefer-await-to-then
    const rv = this.current.then(() => _resolve);
    this.current = p;
    this._unlock = await rv;
    return this._unlock;
  }
}
