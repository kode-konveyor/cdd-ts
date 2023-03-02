
export interface SideEffectChecker<T> {
    setUp(): void;
    check(): void;
    tearDown(): void;
}
