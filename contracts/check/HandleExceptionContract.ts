import { CaseName } from "../../src/check/CaseName.js";
import { HandleException } from "../../src/check/HandleException.js";
import { Contract } from "../../src/contract/Contract.js";
import type { ContractEntity } from "../../src/types/ContractEntity.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { RunDescriptorTestData } from "../../testdata/RunDescriptorTestData.js";
import { SerializableTestData } from "../../testdata/SerializableTestdata.js";

const ContractTestData = makeTestData<
  ContractEntity<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(
  ContractTestDataDescriptor,
  () => new HandleException<TestedFunctionType>(CaseName.prototype.caseName)
);

export const HandleExceptionContractParties = [
  HandleException.prototype.handleException.call.bind(
    HandleException.prototype.handleException
  ),
];
const NOT_THE_EXPECTED_EXCEPTION =
  "Error: The function under test:undefined:undefined:Not the expected exception thrown. Got:Error: hello\nstack:\nfake stacktrace";
const UNEXPECTED_EXCEPTION =
  "Error: The function under test:undefined:undefined: unexpected exception:Error: hello\nstack:\nfake stacktrace";
export const HandleExceptionContract = new Contract<
  typeof HandleException.prototype.handleException
>()
  .setTitle("Handle exceptions")

  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    RunDescriptorTestData.getRunDescriptor,
    SerializableTestData.error
  )
  .thenThrow(
    "If no exception was defined, then an exception signaling that is thrown",
    UNEXPECTED_EXCEPTION
  )

  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    RunDescriptorTestData.getRunDescriptorThrowingAnotherException,
    SerializableTestData.error
  )
  .thenThrow(
    "If another exception was defined, then an exception signaling that is thrown",
    NOT_THE_EXPECTED_EXCEPTION
  );
