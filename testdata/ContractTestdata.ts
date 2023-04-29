import { type ContractEntity } from "../src/types/ContractEntity.js";
import { type TestDataDescriptor } from "src/types/TestDataDescriptor.js";
import { type DescriptorAddType } from "src/types/DescriptorAddType.js";
import { CaseDescriptorTestData } from "./CaseDescriptorTestData.js";
import { LabelTestdata } from "./LabelTestdata.js";
import { type TestedFunctionType } from "./MethodTestData.js";
import { RunDescriptorTestData } from "./RunDescriptorTestData.js";

export const ContractTestDataDescriptor = {
  getContract: { __from: "" },
  getContractWithTitle: {
    __from: "getContract",
    explanation: LabelTestdata.default(),
  },
  getContractWithOtherReturnValue: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorWithOtherreturnValue(),
  },
  getContractWithSideEffectCheckAndThrowingRun: {
    __from: "getContractWithTitle",
    currentRun:
      RunDescriptorTestData.getRunDescriptorWithsideeffectCheckAndRunThrowing(),
  },
  getContractWithFailingReturnvalueCheck: {
    __from: "getContractWithTitle",
    currentRun:
      RunDescriptorTestData.getRunDescriptorWithReturnValueCheckFailing(),
  },
  getContractThrowingUnexpectedExceptionAndOtherRunLater: {
    __from: "getContractWithTitle",
    cases: {
      "": CaseDescriptorTestData.getCaseDescriptorWithThrowingExceptio(),
    },
    currentRun:
      RunDescriptorTestData.getRunDescriptorCorrectlyBuiltWithOtherExplanation(),
  },
  getContractThrowingUnexpectedException: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorThrowingException(),
  },
  getContractNotThrowingDefinedException: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorThrowing(),
  },
  getContractCheckingTheDefinedException: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorCheckingException(),
  },
  getContractThrowingAnotherException: {
    __from: "getContractWithTitle",
    currentRun:
      RunDescriptorTestData.getRunDescriptorThrowingAnotherException(),
  },
  getContractWithFailingSideEffectCheck: {
    __from: "getContractWithTitle",
    currentRun:
      RunDescriptorTestData.getRunDescriptorWithSideEffectCheckCheckFailing(),
  },
  getContractWithFailingSideEffectCheckWithoutTearDown: {
    __from: "getContractWithTitle",
    currentRun:
      RunDescriptorTestData.getRunDescriptorWithSideEffectCheckCheckFailingWithoutTeardown(),
  },
  getContractWithTitleAndRun: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
  },
  getContractWithCorrectCurrentRun: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
  },
  getContractWithCorrectrunandEmptyDefaultCase: {
    __from: "getContractWithCorrectCurrentRun",
    cases: { "": CaseDescriptorTestData.getCaseDescriptor() },
  },
  getContractTriggeringSideEffect: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorTriggeringSideEffect(),
  },
  getContractTriggeringAndCheckingSideEffect: {
    __from: "getContractWithTitle",
    currentRun:
      RunDescriptorTestData.getRunDescriptorTriggeringAndCheckingSideEffect(),
  },
  getContractWithDefaultCase: {
    __from: "getContractWithTitle",
    cases: { "": CaseDescriptorTestData.getCaseDescriptor() },
  },
  getContractWithReturnvalueCheck: {
    __from: "getContractWithDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorWithReturnValueCheck(),
  },
  getContractWithFreshRun: {
    __from: "getContractWithDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorWithExplanation(),
  },
  getContractWithRunInDefaultCase: {
    __from: "getContractWithFreshRun",
    cases: { "": CaseDescriptorTestData.getCaseDescriptorWithCorrectRun() },
  },
  getContractWithParametersSet: {
    __from: "getContractWithDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorParametersSet(),
  },
  getContractWithParametersAndParameterCheckerSet: {
    __from: "getContractWithDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorParametersAndCheckerSet(),
  },
  getContractWithCorrectRunAndEmptyDefaultCase: {
    __from: "getContractWithDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
  },
  getContractThrowingTheDefinedException: {
    __from: "getContractWithDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorCheckingException(),
  },
  getContractWithRunWithParametersInDefaultCase: {
    __from: "getContractWithDefaultCase",
    cases: { "": CaseDescriptorTestData.getCaseDescriptorWithCorrectRun() },
  },
  getContractWithParametersInDefaultCase: {
    __from: "getContractWithRunWithParametersInDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorParametersSet(),
  },
  getContractWithCorrectRunInDefaultCase: {
    __from: "getContractWithRunWithParametersInDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
  },
  getContractWithNonDefaultCase: {
    __from: "getContractWithDefaultCase",
    currentCase: LabelTestdata.caseName(),
    __add: [
      "cases",
      LabelTestdata.caseName(),
      CaseDescriptorTestData.getCaseDescriptor(),
    ] as DescriptorAddType,
  },
  getContractWithManipulatorSet: {
    __from: "getContractWithNonDefaultCase",
    __add: [
      "cases",
      LabelTestdata.caseName(),
      CaseDescriptorTestData.getCaseDescriptorWithManipulatorset(),
    ] as DescriptorAddType,
  },
  getContractWithRunInNonDefaultCaseNoCurrentRun: {
    __from: "getContractWithManipulatorSet",
    __add: [
      "cases",
      "",
      CaseDescriptorTestData.getCaseDescriptorWithCorrectRun(),
    ] as DescriptorAddType,
    currentRun: undefined,
  },
  getContractWithManipulatorSetAndRun: {
    __from: "getContractWithNonDefaultCase",
    __add: [
      "cases",
      LabelTestdata.caseName(),
      CaseDescriptorTestData.getCaseDescriptorWithManipulatorsetAndRun(),
    ] as DescriptorAddType,
  },
  getContractWithNonDefaultCaseAndCurrentRun: {
    __from: "getContractWithNonDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorCorrectlyBuilt(),
  },
  getContractWithNonDefaultCaseAndCurrentRunInCheck: {
    __from: "getContractWithNonDefaultCaseAndCurrentRun",
    currentRunExplanation: LabelTestdata.runExplanation(),
    checkedCase: LabelTestdata.caseName(),
  },
  getContractWithNonDefaultCaseWithARunStored: {
    __from: "getContractWithNonDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorParametersSet(),
    __add: [
      "cases",
      LabelTestdata.caseName(),
      CaseDescriptorTestData.getCaseDescriptorWithCorrectRun(),
    ] as DescriptorAddType,
  },
  getContractWithRunInDefaultCaseAndNonDefaultCaseWithManipulatorSet: {
    __from: "getContractWithNonDefaultCaseAndCurrentRun",
    __add: [
      "cases",
      LabelTestdata.caseName(),
      CaseDescriptorTestData.getCaseDescriptorWithManipulatorset(),
    ] as DescriptorAddType,
  },
  getContractWithCorrectRunInDefaultCaseNoCurrentRun: {
    __from: "getContractWithTitle",
    cases: { "": CaseDescriptorTestData.getCaseDescriptorWithCorrectRun() },
  },
  getContractWithCorrectRunInNonDefaultCaseNoCurrentRun: {
    __from: "getContractWithTitle",
    __add: [
      "cases",
      LabelTestdata.caseName(),
      CaseDescriptorTestData.getCaseDescriptorWithCorrectRun(),
    ] as DescriptorAddType,
  },
  getContractWithRunInDefaultCaseTwice: {
    __from: "getContractWithTitle",
    cases: {
      "": CaseDescriptorTestData.getCaseDescriptorWithCorrectRunTwice(),
    },
  },
} satisfies TestDataDescriptor<ContractEntity<TestedFunctionType>>;
