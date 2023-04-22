import { boundCall } from "../../src/cdd-ts.js";
import { CaseNameService } from "../../src/check/CaseNameService.js";
import { HandleExceptionService } from "../../src/check/HandleExceptionService.js";
import { Contract } from "../../src/contract/Contract.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { RunDescriptorTestData } from "../../testdata/RunDescriptorTestData.js";
import { SerializableTestData } from "../../testdata/SerializableTestdata.js";
import { type DotCall } from "../contract/DotCall.js";

const ContractTestData = new MakeTestDataService<
  HandleExceptionService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new HandleExceptionService<TestedFunctionType>(
      CaseNameService.prototype.caseName
    )
);

export const HandleExceptionContractParties = [
  boundCall(HandleExceptionService),
];

export const HandleExceptionContract = new Contract<
  DotCall<
    HandleExceptionService<TestedFunctionType>,
    HandleExceptionService<TestedFunctionType>["handleException"]
  >
>()
  .setTitle("Handle exceptions")

  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    RunDescriptorTestData.getRunDescriptor,
    SerializableTestData.error
  )
  .thenThrow(
    "If no exception was defined, then an exception signaling that is thrown",
    "Error: The function under test:undefined:undefined: unexpected exception:Error: hello\nstack:\nfake stacktrace"
  )

  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    RunDescriptorTestData.getRunDescriptorThrowingAnotherException,
    SerializableTestData.error
  )
  .thenThrow(
    "If another exception was defined, then an exception signaling that is thrown",
    `Error: The function under test:undefined:run explanation:Not the expected exception thrown.
Expected:cannot be three
Got     :Error: hello
stack:
fake stacktrace`
  );
