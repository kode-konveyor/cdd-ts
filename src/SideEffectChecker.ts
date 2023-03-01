
export interface SideEffectChecker<T> {
    setUp(): undefined;
    test(): undefined;
    tearDown(): undefined;
}
