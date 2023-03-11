
export interface EnvironmentManipulator {
    setUp: () => void;
    tearDown: () => void;
}
