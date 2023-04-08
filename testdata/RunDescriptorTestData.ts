import { RunDescriptorEntity } from "../src/types/RunDescriptorEntity.js";
import { makeTestData, TestDataDescriptor } from "../src/util/makeTestData.js";
import { TestedFunctionType } from "./MethodTestData.js";
import { getReturnValueTestData } from "./ReturnValueTestData.js";
import { SideEffectCheckCaseTestData } from "./SideEffectCheckCaseTestData.js";
import { ParameterTestData } from "./ParametersTestData.js";
import { ReturnValueCheckCaseTestData } from "./ReturnValueCheckCaseTestData.js";
import { LabelTestdata } from "./LabelTestdata.js";

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
  getRunDescriptorWithReturnValueCheckFailing: {
    __from: "getRunDescriptorCorrectlyBuilt",
    returnValueChecks: [ReturnValueCheckCaseTestData.failig()],
  },
  getRunDescriptorWithReturnValueCheck: {
    __from: "getRunDescriptorCorrectlyBuilt",
    returnValueChecks: [ReturnValueCheckCaseTestData.passing()],
  },
  getRunDescriptorWithSideEffectCheckCheckFailing: {
    __from: "getRunDescriptorCorrectlyBuilt",
    sideEffectChecks: [SideEffectCheckCaseTestData.failing()],
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
    returnValueGetter: getReturnValueTestData.getReturnValue,
    returnValueChecks: [],
    sideEffectChecks: [SideEffectCheckCaseTestData.default()],
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

export const RunDescriptorTestData = makeTestData<
  RunDescriptorEntity<TestedFunctionType>,
  typeof runDescriptorTestDataDescriptor
>(
  runDescriptorTestDataDescriptor,
  () => new RunDescriptorEntity<TestedFunctionType>()
);
