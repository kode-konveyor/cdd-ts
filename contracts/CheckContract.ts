import { Check } from "src/check/Check"
import { Contract } from "src/Contract"
import { testedFunction } from "test/testedFunction"
import { container } from "tsyringe"
import { checkExceptionCheckBehaviour } from "./checkExceptionCheckBehaviour"
import { checkSideEffectBehaviour } from "./checkSideEffectBehaviour"
import { theRun, RUN_IDENTIFICATION, failingReturnValueCHeck, getContract } from "./CheckTestData"

export const testedContract = getContract();

export const CheckContractParties = [(fun: typeof testedFunction) => container.resolve(Check).check(testedContract,fun)]
export const CheckContract = 
    new Contract()
    .init("check checks whether the contract actually corresponds to the behaviour of the SUT")
    .ifCalledWith(testedFunction)
    .thenReturn("returns the number of runs checked in the contract",1)
 
    .when(
        "the contract does not contain an ICalledWith",
        {
            setUp: () => { theRun.parameters = undefined},
            tearDown: () => {theRun.parameters = [1,"a"]}
        }
    )
    .ifCalledWith(testedFunction)
    .thenThrow("a 'no ifCalledWith' error is thrown",RUN_IDENTIFICATION+" no ifcalledWith")

    .when(
        "the return value does not correspond to the contract",
        {
            setUp: () => {theRun.returnValue="2"},
            tearDown: () => {theRun.returnValue="1"}
        }
    )
    .ifCalledWith(testedFunction)
    .thenThrow("a 'return value mismatch' error is thrown",RegExp(RUN_IDENTIFICATION+" return value mismatch:.*expected:2.*actual:1","ms"))
 
    .when(
        "a return value constraint does not hold",
        {
            setUp: () => {theRun.returnValueChecks.push(failingReturnValueCHeck)},
            tearDown: () => {theRun.returnValueChecks.pop()}
        }
    )
    .ifCalledWith(testedFunction)
    .thenThrow("a 'return value check did not hold' error is thrown",RUN_IDENTIFICATION+" fail: return value check did not hold")
 
    checkSideEffectBehaviour(CheckContract)
    checkExceptionCheckBehaviour(CheckContract)