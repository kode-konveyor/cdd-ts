import { CaseNameService } from "../../src/check/CaseNameService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { CaseNameTestData } from "../../testdata/CaseNameTestData.js";
import { Contract } from "../../src/contract/Contract.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type DotCall } from "./DotCall.js";

const ContractTestData = new MakeTestDataService<
  CaseNameService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new CaseNameService<TestedFunctionType>()
);

export const caseNameContractParties = [boundCall(CaseNameService)];

export const caseNameContract = new Contract<
  DotCall<
    CaseNameService<TestedFunctionType>,
    CaseNameService<TestedFunctionType>["caseName"]
  >
>()
  .setTitle("returns the name of the currently checked case")
  .ifCalledWith(
    ContractTestData.getContractWithNonDefaultCaseAndCurrentRunInCheck
  )
  .thenReturn(
    "contains the name of the contract, the current case, and the current run",
    CaseNameTestData.nonDefaultCase
  )
  .ifCalledWith(ContractTestData.getContract)
  .thenReturn(
    "For each undefined things uses 'undefined'",
    CaseNameTestData.undefined
  )
  .ifCalledWith(ContractTestData.getContractWithFailingReturnvalueCheck)
  .thenReturn(
    "the return value for the test data",
    CaseNameTestData.withAlwaysPassingCheck
  );
