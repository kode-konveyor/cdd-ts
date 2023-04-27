import { RunDescriptorEntity } from "../src/types/RunDescriptorEntity.js";
import { type TestDataDescriptor } from "src/types/TestDataDescriptor.js";
import { type TestedFunctionType } from "./MethodTestData.js";
import { getReturnValueTestData } from "./ReturnValueTestData.js";
import { SideEffectCheckCaseTestData } from "./SideEffectCheckCaseTestData.js";
import { ParameterTestData } from "./ParameterTestData.js";
import { LabelTestdata } from "./LabelTestdata.js";
import { MakeTestDataService } from "../src/util/MakeTestDataService.js";
import { ReturnValueCheckTestData } from "./ReturnValueCheckTestData.js";
import { ParameterCheckerTestData } from "./ParameterCheckerTestData.js";

export const NONEXISTING_EXCEPTION_IDENTIFIER =
  "no one expects the spanish inquisition";
export const NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN = "cannot be three";

const runDescriptorTestDataDescriptor = {
  getRunDescriptor: {
    __from: "",
  },
  getRunDescriptorParametersSet: {
    __from: "getRunDescriptor",
    parameterGetters: ParameterTestData.default(),
  },
  getRunDescriptorParametersAndCheckerSet: {
    __from: "getRunDescriptorParametersSet",
    parameterCheck: ParameterCheckerTestData.default,
  },
  getRunDescriptorWithExplanation: {
    __from: "getRunDescriptor",
    explanation: LabelTestdata.runExplanation(),
  },
  getRunDescriptorThrowingException: {
    __from: "getRunDescriptorWithExplanation",
    parameterGetters: ParameterTestData.exceptionThrowing(),
  },
  getRunDescriptorCheckingException: {
    __from: "getRunDescriptorThrowingException",
    thrown: LabelTestdata.exceptionThrown(),
  },
  getRunDescriptorTriggeringSideEffect: {
    __from: "getRunDescriptorWithExplanation",
    parameterGetters: ParameterTestData.withSideEffects(),
    returnValueGetter: getReturnValueTestData.getReturnValueSideEffect,
  },
  getRunDescriptorTriggeringAndCheckingSideEffect: {
    __from: "getRunDescriptorTriggeringSideEffect",
    sideEffectChecks: [SideEffectCheckCaseTestData.default()],
  },
  getRunDescriptorParametersAndExplanationSet: {
    __from: "getRunDescriptorWithExplanation",
    parameterGetters: ParameterTestData.default(),
  },
  getRunDescriptorCorrectlyBuilt: {
    __from: "getRunDescriptorParametersAndExplanationSet",
    returnValueGetter: getReturnValueTestData.getReturnValue,
  },
  getRunDescriptorCorrectlyBuiltWithOtherExplanation: {
    __from: "getRunDescriptorParametersAndExplanationSet",
    explanation: "some other explanation",
    returnValueGetter: getReturnValueTestData.getReturnValue,
  },
  getRunDescriptorWithReturnValueCheckFailing: {
    __from: "getRunDescriptorCorrectlyBuilt",
    returnValueChecks: [ReturnValueCheckTestData.failing()],
  },
  getRunDescriptorWithReturnValueCheck: {
    __from: "getRunDescriptorCorrectlyBuilt",
    returnValueChecks: [ReturnValueCheckTestData.passing()],
  },
  getRunDescriptorWithSideEffectCheckCheckFailing: {
    __from: "getRunDescriptorCorrectlyBuilt",
    sideEffectChecks: [SideEffectCheckCaseTestData.failing()],
  },
  getRunDescriptorWithSideEffectCheckCheckFailingWithoutTeardown: {
    __from: "getRunDescriptorCorrectlyBuilt",
    sideEffectChecks: [SideEffectCheckCaseTestData.failingWithoutTearDown()],
  },
  getRunDescriptorWithOtherreturnValue: {
    __from: "getRunDescriptorParametersAndExplanationSet",
    returnValueGetter: getReturnValueTestData.getReturnValueOther,
  },
  getRunDescriptorThrowingAnotherException: {
    __from: "getRunDescriptorParametersAndExplanationSet",
    parameterGetters: ParameterTestData.exceptionThrowing(),
    thrown: NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN,
  },
  getRunDescriptorThrowing: {
    __from: "getRunDescriptorParametersAndExplanationSet",
    thrown: NONEXISTING_EXCEPTION_IDENTIFIER,
  },
  getRunDescriptorwithParametersReturnAndSideeffectcheck: {
    __from: "getRunDescriptorParametersAndExplanationSet",
    __transform: (draft) => {
      draft.returnValueGetter = getReturnValueTestData.getReturnValue;
      draft.returnValueChecks = [];
      draft.sideEffectChecks = [SideEffectCheckCaseTestData.default()];
    },
  },
  getRunDescriptorWithTripleReturn: {
    __from: "getRunDescriptorwithParametersReturnAndSideeffectcheck",
    explanation: "triple return",
    returnValueGetter: getReturnValueTestData.getReturnValueSideEffect,
    sideEffectChecks: [],
  },
  getRunDescriptorWithsideeffectCheckAndRunThrowing: {
    __from: "getRunDescriptorwithParametersReturnAndSideeffectcheck",
    returnValueGetter: getReturnValueTestData.getReturnValueSideEffect,
  },
} satisfies TestDataDescriptor<RunDescriptorEntity<TestedFunctionType>>;

export const RunDescriptorTestData = new MakeTestDataService<
  RunDescriptorEntity<TestedFunctionType>,
  typeof runDescriptorTestDataDescriptor
>().makeTestData(
  runDescriptorTestDataDescriptor,
  () => new RunDescriptorEntity<TestedFunctionType>()
);
