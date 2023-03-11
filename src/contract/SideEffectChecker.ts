
export interface SideEffectChecker {
    setUp: () => void;
    check: () => void;
    tearDown: () => void;
}
