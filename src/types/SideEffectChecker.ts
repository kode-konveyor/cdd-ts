export interface SideEffectCheckerType {
  setUp: (() => void) | (() => Promise<void>);
  check: (() => void) | (() => Promise<void>);
  tearDown: (() => void) | (() => Promise<void>);
}
