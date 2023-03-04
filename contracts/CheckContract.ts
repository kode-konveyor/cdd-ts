import { SeChecker } from "../test/SeChecker";
import { testedFunction } from "../test/testedFunction";
import { BeThat } from "../src/BeThat";
import { Check } from "../src/Check";
import { SideEffectChecker } from "src/SideEffectChecker";

const checkInstance = new Check<typeof testedFunction>()

checkInstance.currentCase="default"
checkInstance.testedFunction = testedFunction
checkInstance.explanation="The function under test"
checkInstance.cases = {
    "": {
        runs: [{
        parameters: [1,"a"],
        returnValue: "1",
        returnValueChecks: [],
        sideEffectChecks: [
            ["logs to console", new SeChecker([["hello a"]])]
        ]
    }]},
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

export const CheckContract = 
    new BeThat("check checks whether the contract actually corresponds to the behaviour of the SUT", () => checkInstance.check())
    .ifCalledWith()
    .thenReturn(1)
    .when(
        "the return value does not correspond to the contract, an error is thrown",
        {
            setUp: () => {checkInstance.cases[""].runs[0].returnValue="2"},
            tearDown: () => {checkInstance.cases[""].runs[0].returnValue="1"}
        }
    )
    .ifCalledWith()
    .thenThrow("The function under test:: return value mismatch:")
    .when(
        "a return value constraint does not hold, an error is thrown",
        {
            setUp: () => {checkInstance.cases[""].runs[0].returnValueChecks.push(failingReturnValueCHeck)},
            tearDown: () => {checkInstance.cases[""].runs[0].returnValueChecks.pop()}
        }
    )
    .ifCalledWith()
    .thenThrow('The function under test:: fail: return value check did not hold')
    .when(
        "a side effect definition does not hold, an error is thrown",
        {
            setUp: () => {checkInstance.cases[""].runs[0].sideEffectChecks.push(failingSideEffectCheck)},
            tearDown: () => {checkInstance.cases[""].runs[0].sideEffectChecks.pop()}
        }
    )
    .ifCalledWith()
    .thenThrow('Error: The function under test:: side effect check: logs to console: did not hold')
    .when(
        "A thrown exception can be defined with a regex for the message",
        {
            setUp: () => {
                checkInstance.cases[""].runs[0].parameters = [2,"a"]
                checkInstance.cases[""].runs[0].thrown = "cannot be two"
            },
            tearDown: () => {
                checkInstance.cases[""].runs[0].parameters = [1,"a"]
                checkInstance.cases[""].runs[0].thrown = undefined
            },
        }
    )
    .ifCalledWith()
    .thenReturn(1)
    .when(
        "If an exception is not expected but thrown, it is an error",
        {
            setUp: () => {
                checkInstance.cases[""].runs[0].parameters = [2,"a"]
            },
            tearDown: () => {
                checkInstance.cases[""].runs[0].parameters = [1,"a"]
            },
        }
    )
    .ifCalledWith()
    .thenThrow("Error: The function under test:: unexpected exception:")
    .when(
        "If an exception is defined in the contract but not thrown, it is an error",
        {
            setUp: () => {
                checkInstance.cases[""].runs[0].thrown = "no one epect the spanish inquisition"
            },
            tearDown: () => {
                checkInstance.cases[""].runs[0].thrown = undefined
            },
        }
    )
    .ifCalledWith()
    .thenThrow("The function under test:: Exception expected but not thrown")
    

