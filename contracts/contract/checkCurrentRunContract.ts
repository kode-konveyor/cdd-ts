import { CheckCurrentRunService } from "../../src/contract/CheckCurrentRunService.js";
import type { ContractEntity } from "../../src/types/ContractEntity.js";
import type { CallType } from "../../src/types/CallType.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { Contract, boundCall } from "../../src/cdd-ts.js";
import { CheckCurrentRunResultTestData } from "../../testdata/CheckCurrentRunResultTestData.js";
import { CheckCurrentRunContractTestData } from "../../testdata/CheckCurrentRunContractTestData.js";

export const checkCurrentRunContractParties = [
  boundCall(CheckCurrentRunService),
];

type CheckCurrentRunCallType = CallType<
  TestedFunctionType,
  typeof CheckCurrentRunService.prototype.checkCurrentRun<TestedFunctionType>,
  ContractEntity<TestedFunctionType>
>;

export const checkCurrentRunContract = new Contract<CheckCurrentRunCallType>()
  .setTitle(
    "checks whether the current run is okay, and pushes it to the current case"
  )
  .ifCalledWith(CheckCurrentRunContractTestData.getContract)
  .thenReturn(
    "if there is no current run, nothing happens",
    CheckCurrentRunResultTestData.default
  )

  .ifCalledWith(
    CheckCurrentRunContractTestData.getContractWithCorrectCurrentRun
  )
  .thenReturn(
    "if there is a correct rurrent run, puts it into the current case",
    CheckCurrentRunResultTestData.putsItToThecurrentCase
  )

  .ifCalledWith(
    CheckCurrentRunContractTestData.getContractWithCorrectRunInDefaultCase
  )
  .thenReturn(
    "if there is a correct rurrent run and non-empty current case, puts it into the current case after the existing one",
    CheckCurrentRunResultTestData.putsItIntoTheCurrentCaseAfterTheExistingOne
  )

  .ifCalledWith(CheckCurrentRunContractTestData.getContractWithFreshRun)
  .thenThrow(
    "throws error for a run without both return and thrown value",
    "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called"
  );
