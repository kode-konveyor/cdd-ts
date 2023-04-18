export class MutexEntity {
  protected current: Promise<unknown> = Promise.resolve();
  protected _unlock?: (() => void) | PromiseLike<() => void>;
}
