import { Contract } from "../../src/contract/Contract.js";
import { GetStubService } from "../../src/contract/GetStubService.js";
import type { MethodType } from "../../src/types/MethodType.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import {
  TestedFunctionTestData,
  type TestedFunctionType,
} from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type DotCall } from "../../src/types/DotCall.js";

export const getStubContractParties = [boundCall(GetStubService)];

const contractTestData = new MakeTestDataService<
  GetStubService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new GetStubService<MethodType>()
);

export const getStubContract = new Contract<
  DotCall<
    GetStubService<TestedFunctionType>,
    GetStubService<TestedFunctionType>["getStub"]
  >
>()
  .setTitle("returns a stub behaving according to the contract")

  .ifCalledWith(contractTestData.getContractWithTitleAndRun)
  .thenReturn(
    "for a simple contract returns a function behaving according to the contract",
    {
      default: TestedFunctionTestData.default,
      check: ReturnValueCheckTestData.stubReturnsDefinedReturnValue,
    }
  )

  .ifCalledWith(contractTestData.getContractThrowingTheDefinedException)
  .thenReturn(
    "for a throwing contract returns a function throwing when needed",
    {
      default: TestedFunctionTestData.default,
      check: ReturnValueCheckTestData.stubThrowsException,
    }
  )

  .ifCalledWith(contractTestData.getContract)
  .thenThrow(
    "if there are no runs in the case, it is an error",
    "no runs in the case"
  )

  .ifCalledWith(
    contractTestData.getContractWithCorrectRunInNonDefaultCaseNoCurrentRun,
    LabelTestdata.nondefaultCaseName
  )
  .thenReturn(
    "if we give a case name as parameter, the stub for that case is returned",
    {
      default: TestedFunctionTestData.default,
      check: ReturnValueCheckTestData.stubReturnsDefinedReturnValue,
    }
  )

  .ifCalledWith(
    contractTestData.getContractWithRunInDefaultCaseTwice,
    LabelTestdata.undefined
  )
  .thenReturn(
    "it is possible to create a contract with the same input multiple times. If there was a parameter checker for that input, the corresponding return value is returned, else it is an error.",
    {
      default: TestedFunctionTestData.default,
      check:
        ReturnValueCheckTestData.stubThrowsMultipleDefinedParameterException,
    }
  );
