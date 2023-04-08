export interface SideEffectCheckerType {
  setUp: () => void;
  check: () => void;
  tearDown: () => void;
}
