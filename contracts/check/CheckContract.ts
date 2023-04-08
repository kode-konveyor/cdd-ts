import { Contract } from "../../src/contract/Contract.js";
import {
  TestedFunctionTestData,
  TestedFunctionType,
} from "../../testdata/MethodTestData.js";
import { Check } from "../../src/check/Check.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { CheckResultTestData } from "../../testdata/CheckResultTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";

const ContractTestData = makeTestData<
  Check<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new Check<TestedFunctionType>());

const contract = new Contract<TestedFunctionType>();

export const CheckContractParties = [
  Check.prototype.check.call.bind(Check.prototype.check),
  contract.check.call.bind(contract.check),
];

const RETURN_VALUE_MISMATCH_PATTERN =
  LabelTestdata.runIdentification() +
  " return value mismatch:.*expected:.2.*actual  :.1";
const MATCH_NEWLINE = "ms";
const otherReturnvalueRegEx = RegExp(
  RETURN_VALUE_MISMATCH_PATTERN,
  MATCH_NEWLINE
);
const RETURN_VALUE_MISMATCH =
  'The function under test:Global multiplier is 3:undefined: return value mismatch:\nexpected:undefined\nactual  :"1"\n---diff---:\n$';
const NO_CHECKS_IN_CONTRACT =
  "Error: no checks in contract The function under test";
const RETURN_VALUE_MISMATCH_SHORT = "return value mismatch";
export const CheckContract = new Contract<typeof Check.prototype.check>()
  .setTitle(
    "check checks whether the contract actually corresponds to the behaviour of the SUT"
  )

  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    TestedFunctionTestData.default
  )
  .thenReturn(
    "it returns the number of runs checked in the contract",
    CheckResultTestData.one
  )

  .ifCalledWith(
    ContractTestData.getContractWithFreshRun,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "if there is no ifCalledWith, a 'no ifCalledWith' error is thrown",
    LabelTestdata.runIdentification() + " no ifcalledWith"
  )

  .ifCalledWith(
    ContractTestData.getContractWithOtherReturnValue,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "if the return value is not according to the contract a 'return value mismatch' error is thrown",
    otherReturnvalueRegEx
  )

  .ifCalledWith(
    ContractTestData.getContractWithFailingReturnvalueCheck,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "if a return value check fails, a 'return value check did not hold' error is thrown",
    LabelTestdata.runIdentification() + " fail: return value check did not hold"
  )

  .ifCalledWith(
    ContractTestData.getContractWithSideEffectCheckAndThrowingRun,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "side effect checks are recommended to enter a mutex in setUp and unlock it in tearDown. TearDown will be called even if the test fails",
    RETURN_VALUE_MISMATCH_SHORT
  )

  .ifCalledWith(
    ContractTestData.getContractWithManipulatorSetAndRun,
    TestedFunctionTestData.withGlobal
  )
  .thenReturn(
    "with a 'when' we can use an environment manipulator to set up the environment",
    CheckResultTestData.one
  )

  .ifCalledWith(
    ContractTestData.getContractThrowingTheDefinedException,
    TestedFunctionTestData.default
  )
  .thenReturn(
    "if an exception is defined with thenThrow, then the check expects the error message to conform to the regex",
    CheckResultTestData.one
  )

  .ifCalledWith(
    ContractTestData.getContractThrowingUnexpectedException,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "in case if an exception which is not in the contract is thrown, an 'unexpected exception' error is thrown",
    LabelTestdata.runIdentification() + " unexpected exception:"
  )

  .ifCalledWith(
    ContractTestData.getContractNotThrowingDefinedException,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "in case an exception is defined in the contract but not thrown, an 'Exception expected but not thrown' error is thrown",
    LabelTestdata.runIdentification() + " Exception expected but not thrown"
  )

  .ifCalledWith(
    ContractTestData.getContractThrowingAnotherException,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "in case a different exception is thrown than what is in the contract, a 'Not the expected exception thrown' error is thrown",
    LabelTestdata.runIdentification() +
      "Not the expected exception thrown. Got:Error: first arg cannot be two\nstack:\nError: first arg cannot be two"
  )

  .ifCalledWith(
    ContractTestData.getContractWithFailingSideEffectCheck,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "In case a side effect check fails, a 'side effect check: (name): did not hold' error is thrown",
    LabelTestdata.runIdentification() +
      " side effect check: logs to console: did not hold"
  )

  .ifCalledWith(
    ContractTestData.getContractWithTitle,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "invalid contract will result in an exception",
    NO_CHECKS_IN_CONTRACT
  )

  .ifCalledWith(
    ContractTestData.getContractWithNonDefaultCaseWithARunStored,
    TestedFunctionTestData.withGlobal
  )
  .thenThrow(
    "in case of non-default case, a current run gets to that case",
    RETURN_VALUE_MISMATCH
  );
