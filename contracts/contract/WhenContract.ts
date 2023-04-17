import { Contract } from "../../src/contract/Contract.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { EnvironmentmanipulatortestData } from "../../testdata/EnvironmentManipulatorTestData.js";
import { WhenService } from "../../src/contract/WhenService.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";

const ContractTestData = makeTestData<
  Contract<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new Contract<TestedFunctionType>());

const contract = new Contract<TestedFunctionType>();

export const WhenContractParties = [
  WhenService.prototype.when.call.bind(WhenService.prototype.when),
  contract.when.call.bind(contract.when),
];

export const WhenContract = new Contract<typeof WhenService.prototype.when>()
  .setTitle(
    "when sets up a case with a title, using an environment manipulator"
  )

  .ifCalledWith(
    ContractTestData.getContractWithDefaultCase,
    LabelTestdata.caseName,
    EnvironmentmanipulatortestData.thrice
  )
  .thenReturn(
    "a contract with the title set",
    ContractTestData.getContractWithManipulatorSet
  )
  .suchThat(
    "a new case is created using the title",
    ReturnValueCheckTestData.newCaseChecker
  )
  .suchThat(
    "the current case is set to the title",
    ReturnValueCheckTestData.currentCaseChecker
  )

  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    LabelTestdata.caseName,
    EnvironmentmanipulatortestData.thrice
  )
  .thenReturn(
    "if there was already a run (ifCalledWith was called), it is put into the previously active case",
    ContractTestData.getContractWithRunInNonDefaultCaseNoCurrentRun
  );
