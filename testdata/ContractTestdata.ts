import { ContractEntity } from "../src/types/ContractEntity.js";
import {
  DescriptorAddType,
  TestDataDescriptor,
} from "../src/util/makeTestData.js";
import { CaseDescriptorTestData } from "./CaseDescriptorTestData.js";
import { LabelTestdata } from "./LabelTestdata.js";
import { TestedFunctionType } from "./MethodTestData.js";
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
  getContractWithReturnvalueCheck: {
    __from: "getContractWithTitle",
    currentRun: RunDescriptorTestData.getRunDescriptorWithReturnValueCheck(),
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
    currentCase: LabelTestdata.nondefaultCaseName(),
    __add: [
      "cases",
      LabelTestdata.nondefaultCaseName(),
      CaseDescriptorTestData.getCaseDescriptor(),
    ] as DescriptorAddType,
  },
  getContractWithManipulatorSet: {
    __from: "getContractWithNonDefaultCase",
    __add: [
      "cases",
      LabelTestdata.nondefaultCaseName(),
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
  },
  getContractWithManipulatorSetAndRun: {
    __from: "getContractWithNonDefaultCase",
    __add: [
      "cases",
      LabelTestdata.nondefaultCaseName(),
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
    checkedCase: LabelTestdata.nondefaultCaseName(),
  },
  getContractWithNonDefaultCaseWithARunStored: {
    __from: "getContractWithNonDefaultCase",
    currentRun: RunDescriptorTestData.getRunDescriptorParametersSet(),
    __add: [
      "cases",
      LabelTestdata.nondefaultCaseName(),
      CaseDescriptorTestData.getCaseDescriptorWithCorrectRun(),
    ] as DescriptorAddType,
  },
  getContractWithRunInDefaultCaseAndNonDefaultCaseWithManipulatorSet: {
    __from: "getContractWithNonDefaultCaseAndCurrentRun",
    __add: [
      "cases",
      LabelTestdata.nondefaultCaseName(),
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
      LabelTestdata.nondefaultCaseName(),
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
