import { RunDescriptorEntity } from "../src/types/RunDescriptorEntity.js";
import { makeTestData, TestDataDescriptor } from "../src/util/makeTestData.js";
import { TestedFunctionType } from "./MethodTestData.js";
import { getReturnValueTestData } from "./ReturnValueTestData.js";
import { getReturnValueCheckFailing } from "./ReturnValueCheckTestData.js";
import { getSideEffectCheckCase, getSideEffectCheckCaseFailing } from "./SideEffectCheckCaseTestData.js";
import { ParameterConstraintCaseType } from "../src/types/ParameterConstraintCaseType.js";
import { ParameterTestData } from "./ParametersTestData.js";

export const EXCEPTION_IDENTIFIER_ACTUALLY_THROWN = "cannot be two";
export const NONEXISTING_EXCEPTION_IDENTIFIER = "no one expects the spanish inquisition";
export const NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN = "cannot be three";
export const RUN_EXPLANATION = "run explanation";

const runDescriptorTestDataDescriptor = {
    getRunDescriptor: {
        __from: ""
    },
        getRunDescriptorParametersSet: {
            __from: "getRunDescriptor",
            parameterGetters: ParameterTestData.default()
        },
        getRunDescriptorWithExplanation: {
            __from: "getRunDescriptor",
            explanation: RUN_EXPLANATION
        },
            getRunDescriptorThrowingException: {
                __from: "getRunDescriptorWithExplanation",
                parameterGetters: ParameterTestData.exceptionThrowing(),
            },
                getRunDescriptorCheckingException: {
                    __from: "getRunDescriptorThrowingException",
                    thrown: EXCEPTION_IDENTIFIER_ACTUALLY_THROWN
                },
            getRunDescriptorTriggeringSideEffect: {
                __from: "getRunDescriptorWithExplanation",
                parameterGetters: ParameterTestData.withSideEffects(),
                returnValueGetter: getReturnValueTestData.getReturnValueSideEffect
            },
            getRunDescriptorParametersAndExplanationSet: {
                __from: "getRunDescriptorWithExplanation",
                parameterGetters: ParameterTestData.default(),
            },
                getRunDescriptorCorrectlyBuilt: {
                    __from: "getRunDescriptorParametersAndExplanationSet",
                    returnValueGetter: getReturnValueTestData.getReturnValue
                },
                    getRunDescriptorWithParameterConstraint: {
                        __from: "getRunDescriptorCorrectlyBuilt",
                        parameterConstraints: [["parameter is two", (num: number, s: string) => num === 2 ? undefined : "not two"] as ParameterConstraintCaseType<TestedFunctionType>]
                    },
                    getRunDescriptorWithReturnValueCheckFailing: {
                        __from: "getRunDescriptorCorrectlyBuilt",
                        returnValueChecks: [getReturnValueCheckFailing()]
                    },
                    getRunDescriptorWithSideEffectCheckCheckFailing: {
                        __from: "getRunDescriptorCorrectlyBuilt",
                        sideEffectChecks: [getSideEffectCheckCaseFailing()]
                    },
                getRunDescriptorWithOtherreturnValue: {
                    __from: "getRunDescriptorParametersAndExplanationSet",
                    returnValueGetter: getReturnValueTestData.getReturnValueOther
                },
                getRunDescriptorThrowingAnotherException: {
                    __from: "getRunDescriptorParametersAndExplanationSet",
                    parameterGetters: ParameterTestData.exceptionThrowing(),
                    thrown: NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN
                },
                getRunDescriptorThrowing: {
                    __from: "getRunDescriptorParametersAndExplanationSet",
                    thrown: NONEXISTING_EXCEPTION_IDENTIFIER
                },
                getRunDescriptorwithParametersReturnAndSideeffectcheck: {
                    __from: "getRunDescriptorParametersAndExplanationSet",
                    returnValueGetter: getReturnValueTestData.getReturnValue,
                    returnValueChecks: [],
                    sideEffectChecks: [getSideEffectCheckCase()],
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
    } satisfies TestDataDescriptor<RunDescriptorEntity<TestedFunctionType>>

export const RunDescriptorTestData = makeTestData<RunDescriptorEntity<TestedFunctionType>, typeof runDescriptorTestDataDescriptor>
    (runDescriptorTestDataDescriptor, () => new RunDescriptorEntity<TestedFunctionType>())
