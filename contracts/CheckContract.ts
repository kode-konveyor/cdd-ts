import { Contract } from "../src/contract/Contract.js"
import { getMethod } from "../testdata/Method/getMethod.js"
import { ContractEntity } from "../src/types/ContractEntity.js"
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType.js"
import { Check } from "../src/check/Check.js"
import { ContractTestData, RUN_IDENTIFICATION } from "../testdata/Contract/ContractTestdata.js"


const checkFunction = (contract: ContractEntity<TestedFunctionType>, sut: TestedFunctionType): number => Check.prototype.check.call(contract, sut)
const checkFunctionFromContract = (contract: ContractEntity<TestedFunctionType>, sut: TestedFunctionType): number => {
    return new Contract<TestedFunctionType>().check.call(contract as Contract<TestedFunctionType>, sut)
}

export const CheckContractParties = [
    checkFunction,
    checkFunctionFromContract
]

type CheckType = typeof checkFunction

export const CheckContract =
    new Contract<CheckType>()
        .setTitle("check checks whether the contract actually corresponds to the behaviour of the SUT")

        .ifCalledWith(ContractTestData["getContractWithCorrectCurrentRun"], getMethod)
        .thenReturn("it returns the number of runs checked in the contract", () =>  1)

        .ifCalledWith(ContractTestData["getContractWithFreshRun"], getMethod)
        .thenThrow("if there is no ifCalledWith, a 'no ifCalledWith' error is thrown", RUN_IDENTIFICATION + " no ifcalledWith")

        .ifCalledWith(ContractTestData["getContractWithOtherReturnValue"], getMethod)
        .thenThrow("if the return value is not according to the contract a 'return value mismatch' error is thrown", RegExp(RUN_IDENTIFICATION + " return value mismatch:.*expected:.2.*actual  :.1", "ms"))

        .ifCalledWith(ContractTestData["getContractWithFailingReturnvalueCheck"], getMethod)
        .thenThrow("if a return value check fails, a 'return value check did not hold' error is thrown", RUN_IDENTIFICATION + " fail: return value check did not hold")

        .ifCalledWith(ContractTestData["getContractWithManipulatorSetAndRun"], getMethod)
        .thenReturn("with a 'when' we can use an environment manipulator to set up the environment", () => 1)

        .ifCalledWith(ContractTestData["getContractThrowingTheDefinedException"], getMethod)
        .thenReturn("if an exception is defined with thenThrow, then the check expects the error message to conform to the regex", () => 1)

        .ifCalledWith(ContractTestData["getContractThrowingUnexpectedException"], getMethod)
        .thenThrow(
            "in case if an exception which is not in the contract is thrown, an 'unexpected exception' error is thrown",
            RUN_IDENTIFICATION + " unexpected exception:")

        .ifCalledWith(ContractTestData["getContractNotThrowingDefinedException"], getMethod)
        .thenThrow(
            "in case an exception is defined in the contract but not thrown, an 'Exception expected but not thrown' error is thrown",
            RUN_IDENTIFICATION + " Exception expected but not thrown")

        .ifCalledWith(ContractTestData["getContractThrowingAnotherException"], getMethod)
        .thenThrow(
            "in case a different exception is thrown than what is in the contract, a 'Not the expected exception thrown' error is thrown",
            RUN_IDENTIFICATION + "Not the expected exception thrown. Got:Error: first arg cannot be two")

        .ifCalledWith(ContractTestData["getContractWithFailingSideEffectCheck"], getMethod)
        .thenThrow(
            "In case a side effect check fails, a 'side effect check: (name): did not hold' error is thrown",
            RUN_IDENTIFICATION + " side effect check: failing sideEffectCheck: did not hold")


        .ifCalledWith(ContractTestData["getContractWithGlobalSideEffectCheck"], getMethod)
        .thenReturn(
            "In case a side effect check is defined globally (before the first ifCalledWith), the side effect check is done for all of the runs",
            () => 1)

        .ifCalledWith(ContractTestData["getContractWithGlobalSideEffectCheckNotHolding"], getMethod)
        .thenThrow(
            "A global side effect check throws the same error as a local one",
            RUN_IDENTIFICATION + " side effect check: logs to console: did not hold")
        .ifCalledWith(ContractTestData["getContractWithTitle"],getMethod)
        .thenThrow("invalid contract wwill result in an exception","Error: no checks in contract The function under test")
