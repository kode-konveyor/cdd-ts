import { Contract } from "../../src/contract/Contract.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { CheckService } from "../../src/check/CheckService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { CheckResultTestData } from "../../testdata/CheckResultTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type ContractEntity } from "../../src/types/ContractEntity.js";

const ContractTestData = new MakeTestDataService<
  CheckService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new CheckService<TestedFunctionType>()
);

const methodName = "check";
export const CheckContractParties = [
  boundCall(CheckService),
  boundCall(Contract, methodName),
];

type CheckServiceTypeUnpromised = (
  self: ContractEntity<TestedFunctionType>,
  sut: TestedFunctionType
) => number;

export const CheckContract = new Contract<CheckServiceTypeUnpromised>()
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
    /The function under test::run explanation: return value mismatch:.*expected:.2.*actual {2}:.1/ms
  )

  .ifCalledWith(
    ContractTestData.getContractWithFailingReturnvalueCheck,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "if a return value check fails, a 'return value check did not hold' error is thrown",
    LabelTestdata.runIdentification() + ".*: return value check did not hold"
  )

  .ifCalledWith(
    ContractTestData.getContractWithSideEffectCheckAndThrowingRun,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "side effect checks are recommended to enter a mutex in setUp and unlock it in tearDown. TearDown will be called even if the test fails",
    "return value mismatch"
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
    ContractTestData.getContractThrowingUnexpectedExceptionAndOtherRunLater,
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
    `Not the expected exception thrown.
Expected:cannot be three
Got     :Error: first arg cannot be two
stack:
Error: first arg cannot be two`
  )

  .ifCalledWith(
    ContractTestData.getContractWithFailingSideEffectCheck,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "In case a side effect check fails, a 'side effect check: (name): did not hold' error is thrown, and the tearDown of the checker is called",
    LabelTestdata.runIdentification() +
      " side effect check: logs to console: did not hold:Error: .with tearDown.SeChecker:"
  )

  .ifCalledWith(
    ContractTestData.getContractWithFailingSideEffectCheckWithoutTearDown,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "If there is no tearDown of the side effect checker, then it is not called",
    LabelTestdata.runIdentification() +
      " side effect check: logs to console: did not hold"
  )

  .ifCalledWith(
    ContractTestData.getContractWithTitle,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "invalid contract will result in an exception",
    "Error: no checks in contract The function under test"
  )

  .ifCalledWith(
    ContractTestData.getContractWithNonDefaultCaseWithARunStored,
    TestedFunctionTestData.withGlobal
  )
  .thenThrow(
    "in case of non-default case, a current run gets to that case",
    'The function under test:Global multiplier is 3:undefined: return value mismatch:\nexpected:undefined\nactual  :"1"\n---diff---:\n$'
  );
