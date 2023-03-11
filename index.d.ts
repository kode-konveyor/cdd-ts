interface SideEffectChecker<T> {
    setUp(): void;
    check(): void;
    tearDown(): void;
}

declare type SutType = (...args: any) => any;

declare class RunDescriptorEntity<T extends SutType> {
    thrown?: string | RegExp;
    parameters?: Parameters<T>;
    returnValue?: ReturnType<T>;
    returnValueChecks: [string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void][];
    sideEffectChecks: [string, SideEffectChecker<T>][];
    explanation: string;
}

declare class CaseDescriptorEntity<T extends SutType> {
    runs: RunDescriptorEntity<T>[];
    setUp?: () => void;
    tearDown?: () => void;
}

declare class ContractEntity<T extends SutType> {
    explanation: string;
    currentCase?: string;
    currentRun?: RunDescriptorEntity<T>;
    testedFunction: T;
    returnValueChecks: [string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void][];
    sideEffectChecks: [string, SideEffectChecker<T>][];
    cases: Record<string, CaseDescriptorEntity<T>>;
    checkedCase: string;
    currentRunExplanation: string;
}

declare class CaseName<T extends SutType> {
    caseName(contract: ContractEntity<T>): string;
}

declare class OneSideEffectCheck<T extends SutType> {
    readonly caseName: CaseName<T>;
    constructor(caseName: CaseName<T>);
    oneSideEffectCheck: (contract: ContractEntity<T>) => (entry: [string, SideEffectChecker<T>]) => void;
}

declare class RunSideEffectChecks<T extends SutType> {
    readonly caseName: CaseName<T>;
    readonly oneSideEffectCheck: OneSideEffectCheck<T>;
    constructor(caseName: CaseName<T>, oneSideEffectCheck: OneSideEffectCheck<T>);
    runSideEffectChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>): void;
}

declare class RunReturnValueChecks<T extends SutType> {
    readonly caseName: CaseName<T>;
    constructor(caseName: CaseName<T>);
    runReturnValueChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>): void;
}

declare class CheckReturnValue<T extends SutType> {
    readonly caseName: CaseName<T>;
    constructor(caseName: CaseName<T>);
    checkReturnValue(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, result: ReturnType<T>): void;
}

declare class HandleException<T extends SutType> {
    readonly caseName: CaseName<T>;
    constructor(caseName: CaseName<T>);
    handleException(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>, catched: unknown): void;
}

declare class SetUpSideEffectChecks<T extends SutType> {
    setUpSideEffectChecks(contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>): void;
}

declare class HandleRun<T extends SutType> {
    readonly caseName: CaseName<T>;
    readonly setUpSideEffectChecks: SetUpSideEffectChecks<T>;
    readonly handleException: HandleException<T>;
    readonly checkReturnValue: CheckReturnValue<T>;
    readonly runReturnValueChecks: RunReturnValueChecks<T>;
    readonly runSideEffectChecks: RunSideEffectChecks<T>;
    constructor(caseName: CaseName<T>, setUpSideEffectChecks: SetUpSideEffectChecks<T>, handleException: HandleException<T>, checkReturnValue: CheckReturnValue<T>, runReturnValueChecks: RunReturnValueChecks<T>, runSideEffectChecks: RunSideEffectChecks<T>);
    handleRun: (contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) => number;
}

declare class Check<T extends SutType> {
    caseName: (contract: ContractEntity<T>) => string;
    handleRun: (contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) => number;
    constructor(caseName: CaseName<T>, handleRun: HandleRun<T>);
    check(contract: ContractEntity<T>, sut: T): number;
}

declare class IfCalledWith<T extends SutType> extends ContractEntity<T> {
    ifCalledWith(...parameters: Parameters<T>): this;
}

declare class Meanwhile<T extends SutType> extends ContractEntity<T> {
    meanwhile(reason: string, checker: SideEffectChecker<T>): this;
}

declare class SuchThat<T extends SutType> extends ContractEntity<T> {
    suchThat(explanation: string, checker: (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void): this;
}

declare class ThenReturn<T extends SutType> extends ContractEntity<T> {
    thenReturn(explanation: string, returnValue: ReturnType<T>): this;
}

declare class ThenThrow<T extends SutType> extends ContractEntity<T> {
    thenThrow(explanation: string, expectedRegex: string | RegExp): this;
}

declare type EnvironmentManipulator = {
    setUp: () => void;
    tearDown: () => void;
};

declare class When<T extends SutType> extends ContractEntity<T> {
    when(explanation: string, environmentManipulator: EnvironmentManipulator): this;
}

declare class Stub<T extends SutType> extends ContractEntity<T> {
    stub(caseName?: string): T;
}

declare class SetTitle<T extends SutType> extends ContractEntity<T> {
    setTitle(explanation: string): this;
}

interface _Contract<T extends SutType> extends SetTitle<T>, When<T>, IfCalledWith<T>, ThenReturn<T>, ThenThrow<T>, SuchThat<T>, Meanwhile<T>, Stub<T> {
}
declare class _Contract<T extends SutType> extends ContractEntity<T> {
}
declare const Contract: typeof _Contract;
declare type Contract<T extends SutType> = _Contract<T>;

export { Check, Contract, IfCalledWith, Meanwhile, SetTitle, Stub, SuchThat, ThenReturn, ThenThrow, When };
