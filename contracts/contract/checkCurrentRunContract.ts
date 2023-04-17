import { Contract } from "../../src/cdd-ts.js";
import { CheckCurrentRunService } from "../../src/contract/CheckCurrentRunService.js";
import type { ContractEntity } from "../../src/types/ContractEntity.js";
import type { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import type { CallType } from "../../testdata/CallType.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { caseNameContract } from "./caseNameContract.js";

export const checkCurrentRunContractParties = [
  CheckCurrentRunService.prototype.checkCurrentRun.call.bind(
    CheckCurrentRunService.prototype.checkCurrentRun
  ),
];

const contractTestData = makeTestData<
  ContractEntity<MethodType>,
  typeof ContractTestDataDescriptor
>(
  ContractTestDataDescriptor,
  () => new CheckCurrentRunService(caseNameContract.getStubForMixin())
);

type ckrcall = CallType<
  TestedFunctionType,
  typeof CheckCurrentRunService.prototype.checkCurrentRun<TestedFunctionType>,
  ContractEntity<TestedFunctionType>
>;

const CURRENT_RUN_IS_INCOMPLETE =
  "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called";
export const checkCurrentRunContract = new Contract<ckrcall>()
  .setTitle(
    "checks whether the current run is okay, and pushes it to the current case"
  )
  .ifCalledWith(contractTestData.getContract)
  .thenReturn(
    "if there is no current run, nothing happens",
    contractTestData.getContract
  )

  .ifCalledWith(contractTestData.getContractWithCorrectCurrentRun)
  .suchThat(
    "The contract is put to the current case",
    ReturnValueCheckTestData.putTotheCurrentCaseAtZero
  )
  .suchThat("The current run is cleared", (retval, contract) =>
    (contract as ContractEntity<MethodType>).currentRun === undefined
      ? undefined
      : "oops"
  )
  .thenReturn(
    "if there is a correct rurrent run, puts it into the current case",
    contractTestData.getContractWithCorrectRunInDefaultCaseNoCurrentRun
  )

  .ifCalledWith(contractTestData.getContractWithCorrectRunInDefaultCase)
  .suchThat(
    "The contract is put to the current case",
    ReturnValueCheckTestData.putTotheCurrentCaseAtZero
  )
  .suchThat(
    "After the case which is currently there",
    ReturnValueCheckTestData.putTotheCurrentCaseAtOne
  )
  .suchThat(
    "The current run is cleared",
    ReturnValueCheckTestData.currentRunIsCleared
  )
  .thenReturn(
    "if there is a correct rurrent run and non-empty current case, puts it into the current case after the existing one",
    contractTestData.getContractWithRunInDefaultCaseTwice
  )

  .ifCalledWith(contractTestData.getContractWithFreshRun)
  .thenThrow(
    "throws error for a run without both return and thrown value",
    CURRENT_RUN_IS_INCOMPLETE
  );
