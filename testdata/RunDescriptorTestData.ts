import { RunDescriptorEntity } from "../src/types/RunDescriptorEntity.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { TestedFunctionType } from "./MethodTestData.js";
import { getParameters, getParametersThrowingException, getParametersWithoutSideEffects } from "./ParametersTestData.js";
import { getReturnValueTestData } from "./ReturnValueTestData.js";
import { getReturnValueCheckFailing } from "./ReturnValueCheckTestData.js";
import { getSideEffectCheckCase, getSideEffectCheckCaseFailing } from "./SideEffectCheckCaseTestData.js";
import { ParameterConstraintCaseType } from "../src/types/ParameterConstraintCaseType.js";

export const EXCEPTION_IDENTIFIER_ACTUALLY_THROWN = "cannot be two";
export const NONEXISTING_EXCEPTION_IDENTIFIER = "no one expects the spanish inquisition";
export const NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN = "cannot be three";
export const RUN_EXPLANATION = "run explanation";

const runDescriptorTestDataDescriptor
// : TestDataDescriptor<RunDescriptorEntity<TestedFunctionType>>
= {
    getRunDescriptor: {
        __from: ""
    },
        getRunDescriptorParametersSet: {
            __from: "getRunDescriptor",
            parameterGetters: getParameters()
        },
        getRunDescriptorWithExplanation: {
            __from: "getRunDescriptor",
            explanation: RUN_EXPLANATION
        },
            getRunDescriptorThrowingException: {
                __from: "getRunDescriptorWithExplanation",
                parameterGetters: getParametersThrowingException(),
            },
                getRunDescriptorCheckingException: {
                    __from: "getRunDescriptorThrowingException",
                    thrown: EXCEPTION_IDENTIFIER_ACTUALLY_THROWN
                },
            getRunDescriptorNotTriggeringSideEffect: {
                __from: "getRunDescriptorWithExplanation",
                parameterGetters: getParametersWithoutSideEffects(),
                returnValueGetter: getReturnValueTestData.getReturnValueSideEffect
            },
                getRunDescriptorWithParameterConstraint: {
                    __from: "getRunDescriptorNotTriggeringSideEffect",
                    parameterConstraints: [["parameter is two", (num: number, s: string) => num === 1?undefined:"not two"] as ParameterConstraintCaseType<TestedFunctionType>]
                },
            getRunDescriptorParametersAndExplanationSet: {
                __from: "getRunDescriptorWithExplanation",
                parameterGetters: getParameters(),
            },
                getRunDescriptorCorrectlyBuilt: {
                    __from: "getRunDescriptorParametersAndExplanationSet",
                    returnValueGetter: getReturnValueTestData.getReturnValue
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
                    parameterGetters: getParametersThrowingException(),
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
}
export const RunDescriptorTestData = makeTestData<RunDescriptorEntity<TestedFunctionType>, typeof runDescriptorTestDataDescriptor>
    (runDescriptorTestDataDescriptor, () => new RunDescriptorEntity<TestedFunctionType>())
