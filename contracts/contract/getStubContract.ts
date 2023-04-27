import { Contract } from "../../src/contract/Contract.js";
import { GetStubService } from "../../src/contract/GetStubService.js";
import type { MethodType } from "../../src/types/MethodType.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { NONDEFAULT_CASE_NAME } from "../../testdata/LabelTestdata.js";
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

  .ifCalledWith(contractTestData.getContractWithRunInDefaultCaseTwice)
  .thenReturn(
    "it is possible to create a contract with the same input multiple times. If there was a parameter checker for that input, the corresponding return value is returned, else it is an error.",
    {
      default: TestedFunctionTestData.default,
      check:
        ReturnValueCheckTestData.stubThrowsMultipleDefinedParameterException,
    }
  )
  .when("the state contains cases defined for the stub", {
    setUp() {
      Contract.states = [NONDEFAULT_CASE_NAME];
    },
    tearDown() {},
  })
  .ifCalledWith(
    contractTestData.getContractWithCorrectRunInNonDefaultCaseNoCurrentRun
  )
  .thenReturn("the stub for the case encountered first in state is returned", {
    default: TestedFunctionTestData.default,
    check: ReturnValueCheckTestData.stubReturnsDefinedReturnValue,
  });
