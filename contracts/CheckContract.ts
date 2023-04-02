import { Contract } from "../src/contract/Contract.js"
import { TestedFunctionTestData, TestedFunctionType } from "../testdata/MethodTestData.js"
import { Check } from "../src/check/Check.js"
import { ContractTestDataDescriptor, RUN_IDENTIFICATION } from "../testdata/ContractTestdata.js"
import { makeTestData } from "../src/util/makeTestData.js"
import { CheckResultTestData } from "../testdata/CheckResultTestData.js"

const ContractTestData = makeTestData<Contract<TestedFunctionType>,typeof ContractTestDataDescriptor>(
    ContractTestDataDescriptor,
    ()=>new Contract<TestedFunctionType>())

const contract = new Contract<TestedFunctionType>()

export const CheckContractParties = [
    Check.prototype.check.call.bind(Check.prototype.check),
    contract.check.call.bind(contract.check)
]

export const CheckContract =
    new Contract<typeof Check.prototype.check>()
        .setTitle("check checks whether the contract actually corresponds to the behaviour of the SUT")

        .ifCalledWith(ContractTestData.getContractWithCorrectCurrentRun, TestedFunctionTestData.default)
        .thenReturn("it returns the number of runs checked in the contract", CheckResultTestData.one)

        .ifCalledWith(ContractTestData.getContractWithFreshRun, TestedFunctionTestData.default)
        .thenThrow("if there is no ifCalledWith, a 'no ifCalledWith' error is thrown", RUN_IDENTIFICATION + " no ifcalledWith")

        .ifCalledWith(ContractTestData.getContractWithOtherReturnValue, TestedFunctionTestData.default)
        .thenThrow("if the return value is not according to the contract a 'return value mismatch' error is thrown", RegExp(RUN_IDENTIFICATION + " return value mismatch:.*expected:.2.*actual  :.1", "ms"))

        .ifCalledWith(ContractTestData.getContractWithFailingReturnvalueCheck, TestedFunctionTestData.default)
        .thenThrow("if a return value check fails, a 'return value check did not hold' error is thrown", RUN_IDENTIFICATION + " fail: return value check did not hold")

        .ifCalledWith(ContractTestData.getContractWithManipulatorSetAndRun, TestedFunctionTestData.default)
        .thenReturn("with a 'when' we can use an environment manipulator to set up the environment", CheckResultTestData.one)

        .ifCalledWith(ContractTestData.getContractThrowingTheDefinedException, TestedFunctionTestData.default)
        .thenReturn("if an exception is defined with thenThrow, then the check expects the error message to conform to the regex", CheckResultTestData.one)

        .ifCalledWith(ContractTestData.getContractThrowingUnexpectedException, TestedFunctionTestData.default)
        .thenThrow(
            "in case if an exception which is not in the contract is thrown, an 'unexpected exception' error is thrown",
            RUN_IDENTIFICATION + " unexpected exception:")

        .ifCalledWith(ContractTestData.getContractNotThrowingDefinedException, TestedFunctionTestData.default)
        .thenThrow(
            "in case an exception is defined in the contract but not thrown, an 'Exception expected but not thrown' error is thrown",
            RUN_IDENTIFICATION + " Exception expected but not thrown")

        .ifCalledWith(ContractTestData.getContractThrowingAnotherException, TestedFunctionTestData.default)
        .thenThrow(
            "in case a different exception is thrown than what is in the contract, a 'Not the expected exception thrown' error is thrown",
            RUN_IDENTIFICATION + "Not the expected exception thrown. Got:Error: first arg cannot be two\nstack:\nError: first arg cannot be two")

        .ifCalledWith(ContractTestData.getContractWithFailingSideEffectCheck, TestedFunctionTestData.default)
        .thenThrow(
            "In case a side effect check fails, a 'side effect check: (name): did not hold' error is thrown",
            RUN_IDENTIFICATION + " side effect check: failing sideEffectCheck: did not hold")


        .ifCalledWith(ContractTestData.getContractWithGlobalSideEffectCheck, TestedFunctionTestData.default)
        .thenReturn(
            "In case a side effect check is defined globally (before the first ifCalledWith), the side effect check is done for all of the runs",
            CheckResultTestData.one)

        .ifCalledWith(ContractTestData.getContractWithGlobalSideEffectCheckNotHolding, TestedFunctionTestData.default)
        .thenThrow(
            "A global side effect check throws the same error as a local one",
            RUN_IDENTIFICATION + " side effect check: logs to console: did not hold")

        .ifCalledWith(ContractTestData.getContractWithTitle,TestedFunctionTestData.default)
        .thenThrow("invalid contract will result in an exception","Error: no checks in contract The function under test")

        .ifCalledWith(ContractTestData.getContractWithNonDefaultCaseWithARunStored,TestedFunctionTestData.default)
        .thenThrow("in case of non-default case, a current run gets to that case",
            "The function under test:Global multiplier is 3:undefined: return value mismatch:\nexpected:undefined\nactual  :\"1\"\n---diff---:\n$")
