import { CheckCurrentRun } from "../../src/contract/CheckCurrentRun.js";
import { Contract } from "../../src/contract/Contract.js";
import { GetStub } from "../../src/contract/GetStub.js";
import { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";

export const getStubContractParties = [
  GetStub.prototype.getStub.call.bind(GetStub.prototype.getStub),
];

const contractTestData = makeTestData(
  ContractTestDataDescriptor,
  () => new GetStub<MethodType>(CheckCurrentRun.prototype.checkCurrentRun)
);

const NO_RUNS_IN_THE_CASE = "no runs in the case";
export const getStubContract = new Contract<typeof GetStub.prototype.getStub>()
  .setTitle("returns a stub behaving according to the contract")

  .ifCalledWith(contractTestData.getContractWithTitleAndRun)
  .suchThat(
    "For the parameters defined it returns the defined return value",
    ReturnValueCheckTestData.stubReturnsDefinedReturnValue
  )
  .thenReturn(
    "for a simple contract returns a function behaving according to the contract",
    TestedFunctionTestData.default
  )

  .ifCalledWith(contractTestData.getContractThrowingTheDefinedException)
  .suchThat(
    "For the parameters defined to throw an exception, throw the defined exception",
    ReturnValueCheckTestData.stubThrowsException
  )
  .thenReturn(
    "for a throwing contract returns a function throwing when needed",
    TestedFunctionTestData.default
  )

  .ifCalledWith(contractTestData.getContract)
  .thenThrow(
    "if ther are no runs in the case, it is an error",
    NO_RUNS_IN_THE_CASE
  )

  .ifCalledWith(
    contractTestData.getContractWithCorrectRunInNonDefaultCaseNoCurrentRun,
    LabelTestdata.nondefaultCaseName
  )
  .suchThat(
    "For the parameters defined it returns the defined return value",
    ReturnValueCheckTestData.stubReturnsDefinedReturnValue
  )
  .thenReturn(
    "if we give a case name as parameter, the stub for that case is returned",
    TestedFunctionTestData.default
  )

  .ifCalledWith(
    contractTestData.getContractWithRunInDefaultCaseTwice,
    LabelTestdata.undefined
  )
  .suchThat(
    "if the contract defines outcome for the same parameter zero or more than one time, the stub throws an error if called with that parameters",
    ReturnValueCheckTestData.stubThrowsMultipleDefinedParameterException
  )
  .thenReturn(
    "it is possible to create a contract with the same input multiple times",
    TestedFunctionTestData.default
  );
