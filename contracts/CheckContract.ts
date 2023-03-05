import { Check } from "src/Check"
import { Contract } from "src/Contract"
import { testedFunction } from "test/testedFunction"
import { checkExceptionCheckBehaviour } from "./checkExceptionCheckBehaviour"
import { checkSideEffectBehaviour } from "./checkSideEffectBehaviour"
import { theRun, RUN_IDENTIFICATION, failingReturnValueCHeck, getCheckInstance } from "./CheckTestData"

export const checkInstance = getCheckInstance();

export const CheckContractParties = [() => checkInstance.check(testedFunction)]
export const CheckContract = 
    new Contract("check checks whether the contract actually corresponds to the behaviour of the SUT")
    .ifCalledWith()
    .thenReturn("returns the number of runs checked in the contract",1)
 
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
 
    checkSideEffectBehaviour(CheckContract)
    checkExceptionCheckBehaviour(CheckContract)