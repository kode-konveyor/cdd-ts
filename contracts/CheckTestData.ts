import { Check } from "src/Check";
import { RunDescriptorEntity } from "src/RunDescriptorEntity";
import { SideEffectChecker } from "src/SideEffectChecker";
import { SeChecker } from "test/SeChecker";
import { testedFunction } from "test/testedFunction";

export const sideEffectChecks:[string, SideEffectChecker<(arg: number, arg2: string) => string>][] = [
    ["logs to console", new SeChecker([["hello a"]])]
];

export const theRun:RunDescriptorEntity<(arg: number, arg2: string) => string> = new RunDescriptorEntity()

function setTherun() {
    theRun.explanation= "run explanation";
    theRun.parameters= [1, "a"];
    theRun.returnValue= "1";
    theRun.returnValueChecks= [];
    theRun.sideEffectChecks= sideEffectChecks;
    theRun.thrown=undefined
};

setTherun()

export function getCheckInstance() {
    const checkInstance = new Check<typeof testedFunction>()

    checkInstance.currentCase="default"
    checkInstance.testedFunction = testedFunction
    checkInstance.explanation="The function under test"
    checkInstance.cases = {
        "": { runs: [theRun]},
    }
    return checkInstance
}

export const failingReturnValueCHeck: [string, (returnValue: string, arg: number, arg2: string) => void] = [
    "fail",
    (a, b) => {
        throw new Error("returnvalue check failure");
    }
];

export const failingSideEffectCheck: [string, SideEffectChecker<(arg: number, arg2: string) => string>] = [
    "failing sideEffectCheck",
    new SeChecker([["these are not the droids you are looking for"]])
]

export const RUN_IDENTIFICATION = "The function under test::run explanation:"

export const exceptionThrowerParameters:[arg: number, arg2: string] = [2, "a"];

export const anotherExceptionThrownEnvSetup = {
    setUp: () => {
        theRun.parameters = exceptionThrowerParameters;
        theRun.thrown = "cannot be three";
    },
    tearDown: () => setTherun()
};
export const defineExceptionNotThrownEnvSetup = {
    setUp: () => { theRun.thrown = "no one expects the spanish inquisition"; },
    tearDown: () => setTherun()
};
export const throwExceptionUnexpectedlyEnvSetup = {
    setUp: () => { theRun.parameters = exceptionThrowerParameters; },
    tearDown: () => setTherun()
};
export const definedExceptionThrownEnvSetup = {
    setUp: () => {
        theRun.parameters = exceptionThrowerParameters;
        theRun.thrown = "cannot be two";
    },
    tearDown: () => setTherun()
};
