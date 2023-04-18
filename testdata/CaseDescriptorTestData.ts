import { CaseDescriptorEntity } from "../src/types/CaseDescriptorEntity.js";
import { type MethodType } from "../src/types/MethodType.js";
import { MakeTestDataService } from "../src/util/MakeTestDataService.js";
import { EnvironmentmanipulatortestData } from "./EnvironmentManipulatorTestData.js";
import { RunDescriptorTestData } from "./RunDescriptorTestData.js";

const caseDescriptorTestdataDescriptor = {
  getCaseDescriptor: { __from: "" },
  getCaseDescriptorWithCorrectRun: {
    __from: "getCaseDescriptor",
    runs: [RunDescriptorTestData.getRunDescriptorCorrectlyBuilt()],
  },
  getCaseDescriptorWithCorrectRunTwice: {
    __from: "getCaseDescriptor",
    runs: [
      RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
      RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
    ],
  },
  getCaseDescriptorWithOtherReturnValue: {
    __from: "getCaseDescriptor",
    runs: [RunDescriptorTestData.getRunDescriptorWithOtherreturnValue()],
  },
  getCaseDescriptorWithReturnValueCheckFailing: {
    __from: "getCaseDescriptor",
    runs: [RunDescriptorTestData.getRunDescriptorWithReturnValueCheckFailing()],
  },
  getCaseDescriptorWithSideEffectCheckCheckFailing: {
    __from: "getCaseDescriptor",
    runs: [
      RunDescriptorTestData.getRunDescriptorWithSideEffectCheckCheckFailing(),
    ],
  },
  getCaseDescriptorWithThrowingRun: {
    __from: "getCaseDescriptor",
    runs: [RunDescriptorTestData.getRunDescriptorThrowing()],
  },
  getCaseDescriptorWithThrowingExceptio: {
    __from: "getCaseDescriptor",
    runs: [RunDescriptorTestData.getRunDescriptorThrowingException()],
  },
  getCaseDescriptorWithThrowingAnotherExceptionRun: {
    __from: "getCaseDescriptor",
    runs: [RunDescriptorTestData.getRunDescriptorThrowingAnotherException()],
  },
  getCaseDescriptorWithManipulatorset: {
    __from: "getCaseDescriptor",
    setUp: EnvironmentmanipulatortestData.thrice().setUp,
    tearDown: EnvironmentmanipulatortestData.thrice().tearDown,
  },
  getCaseDescriptorWithManipulatorsetAndRun: {
    __from: "getCaseDescriptorWithManipulatorset",
    runs: [RunDescriptorTestData.getRunDescriptorWithTripleReturn()],
  },
};

export const CaseDescriptorTestData = new MakeTestDataService<
  CaseDescriptorEntity<MethodType>,
  typeof caseDescriptorTestdataDescriptor
>().makeTestData(
  caseDescriptorTestdataDescriptor,
  () => new CaseDescriptorEntity()
);
