import { SeChecker } from "../test/SeChecker";
import { testedFunction } from "../test/testedFunction";
import { Contract } from "../src/Contract";
import { Check } from "../src/Check";
import { SideEffectChecker } from "src/SideEffectChecker";
import { RunDescriptorEntity } from "src/RunDescriptorEntity";

const sideEffectChecks:[string, SideEffectChecker<(arg: number, arg2: string) => string>][] = [
    ["logs to console", new SeChecker([["hello a"]])]
];
const theRun:RunDescriptorEntity<(arg: number, arg2: string) => string> = {
    explanation: "run explanation",
    parameters: [1, "a"],
    returnValue: "1",
    returnValueChecks: [],
    sideEffectChecks: sideEffectChecks
};

const checkInstance = new Check<typeof testedFunction>()

checkInstance.currentCase="default"
checkInstance.testedFunction = testedFunction
checkInstance.explanation="The function under test"
checkInstance.cases = {
    "": {
        runs: [theRun]},
}

const failingReturnValueCHeck: [string, (returnValue: string, arg: number, arg2: string) => void] = [
    "fail",
    (a, b) => {
        throw new Error("returnvalue check failure");
    }
];

const failingSideEffectCheck: [string, SideEffectChecker<(arg: number, arg2: string) => string>] = [
    "failing sideEffectCheck",
    new SeChecker([["these are not the droids you are looking for"]])
]

const RUN_IDENTIFICATION = "The function under test::run explanation:"

export const CheckContractParties = [() => checkInstance.check(testedFunction)]
export const CheckContract = 
    new Contract("check checks whether the contract actually corresponds to the behaviour of the SUT")
    .ifCalledWith()
    .thenReturn("returns the number of runs checked in the contract",1)
    .when(
        "the return value does not correspond to the contract",
        {
            setUp: () => {theRun.returnValue="2"},
            tearDown: () => {theRun.returnValue="1"}
        }
    )
    .ifCalledWith()
    .thenThrow("a 'return value mismatch' error is thrown",RegExp(RUN_IDENTIFICATION+" return value mismatch:.*expected:2.*actual:1","ms"))
    .when(
        "a return value constraint does not hold",
        {
            setUp: () => {theRun.returnValueChecks.push(failingReturnValueCHeck)},
            tearDown: () => {theRun.returnValueChecks.pop()}
        }
    )
    .ifCalledWith()
    .thenThrow("a 'return value check did not hold' error is thrown",RUN_IDENTIFICATION+" fail: return value check did not hold")
    .when(
        "a side effect definition does not hold",
        {
            setUp: () => {theRun.sideEffectChecks.push(failingSideEffectCheck)},
            tearDown: () => {theRun.sideEffectChecks.pop()}
        }
    )
    .ifCalledWith()
    .thenThrow("A 'side effect check: (name): did not hold' error is thrown",RUN_IDENTIFICATION+" side effect check: logs to console: did not hold")
    .when(
        "A thrown exception defined by thenThrow with a regex for the message either with a string or a RegExp object",
        {
            setUp: () => {
                theRun.parameters = [2,"a"]
                theRun.thrown = "cannot be two"
            },
            tearDown: () => {
                theRun.parameters = [1,"a"]
                theRun.thrown = undefined
            },
        }
    )
    .ifCalledWith()
    .thenReturn("then the check expect the error message to conform to the regex",1)
    .when(
        "an exception is not expected but thrown",
        {
            setUp: () => {theRun.parameters = [2,"a"]},
            tearDown: () => { theRun.parameters = [1,"a"] },
        }
    )
    .ifCalledWith()
    .thenThrow("an 'unexpected exception' error is thrown",RUN_IDENTIFICATION+" unexpected exception:")
    .when(
        "an exception is defined in the contract but not thrown",
        {
            setUp: () => {theRun.thrown = "no one epect the spanish inquisition"},
            tearDown: () => { theRun.thrown = undefined},
        }
    )
    .ifCalledWith()
    .thenThrow("an 'Exception expected but not thrown' error is thrown",RUN_IDENTIFICATION+" Exception expected but not thrown")
    .when(
        "the contract does not contain an ICalledWith",
        {
            setUp: () => { theRun.parameters = undefined},
            tearDown: () => {theRun.parameters = [1,"a"]}
        }
    )
    .ifCalledWith()
    .thenThrow("a 'no ifCalledWith' error is thrown",RUN_IDENTIFICATION+" no ifcalledWith")
    .when(
        "another exception is thrown which is defined in the contract",
        {
            setUp: () => {
                theRun.parameters = [2,"a"]
                theRun.thrown = "cannot be three"
            },
            tearDown: () => {
                theRun.parameters = [1,"a"]
                theRun.thrown = undefined
            },
        }
    )
    .ifCalledWith()
    .thenThrow("a 'Not the expected exception thrown' error is thrown",RUN_IDENTIFICATION+"Not the expected exception thrown. Got:Error: first arg cannot be two")
    .when(
        "side effect is not observed,",
        {
            setUp: () => { theRun.parameters = [3,"a"];theRun.returnValue="3"},
            tearDown: () => {theRun.parameters = [1,"a"];theRun.returnValue="1"}
        }
    ).ifCalledWith()
    .thenThrow("a 'side effect check: (name): did not hold' error is thrown",RUN_IDENTIFICATION+" side effect check: logs to console: did not hold")
    .when(
        "meanWhile is before the first ifCalledWith",
        {
            setUp: () => { theRun.sideEffectChecks=[],checkInstance.sideEffectChecks=sideEffectChecks},
            tearDown: () => {theRun.sideEffectChecks=sideEffectChecks;checkInstance.sideEffectChecks=[]}
        }
    ).ifCalledWith()
    .thenReturn("the side effect check is done for all of the runs",1)
    .when(
        "a global side effect does not hold",
        {
            setUp: () => {
                theRun.parameters = [3,"a"];
                theRun.returnValue="3";
                theRun.sideEffectChecks=[];
                checkInstance.sideEffectChecks=sideEffectChecks},
            tearDown: () => {
                theRun.parameters = [1,"a"];
                theRun.returnValue="1";
                theRun.sideEffectChecks=sideEffectChecks;
                checkInstance.sideEffectChecks=[]}
        }
    ).ifCalledWith()
    .thenThrow("it throws the same error as a local one",RUN_IDENTIFICATION+" side effect check: logs to console: did not hold")
