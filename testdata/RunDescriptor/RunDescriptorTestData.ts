import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getParameters } from "../Parameters/getParameters.js";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException.js";
import { getParametersWithoutSideEffects } from "../Parameters/getParametersWithoutSideEffects.js";
import { getReturnValue } from "../ReturnValue/getReturnValue.js";
import { getReturnValueOther } from "../ReturnValue/getReturnValueOther.js";
import { getReturnValueSideEffect } from "../ReturnValue/getReturnValueSideEffect.js";
import { getReturnValueCheckFailing } from "../ReturnValueCheck/getReturnValueCheckFailing.js";
import { getSideEffectCheckCase } from "../SideEffectCheckCase/getSideEffectCheckCase.js";
import { getSideEffectCheckCaseFailing } from "../SideEffectCheckCase/getSideEffectCheckCaseFailing.js";

export const EXCEPTION_IDENTIFIER_ACTUALLY_THROWN = "cannot be two";
export const NONEXISTING_EXCEPTION_IDENTIFIER = "no one expects the spanish inquisition";
export const NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN = "cannot be three";


export const RunDescriptorTestData = makeTestData<RunDescriptorEntity<TestedFunctionType>>({
    getRunDescriptor: {__from: ""
    },
        getRunDescriptorParametersSet: {__from: "getRunDescriptor",
            parameterGetters: getParameters()
        },
        getRunDescriptorWithExplanation: {__from: "getRunDescriptor",
            explanation: "run explanation"
        },
            getRunDescriptorThrowingException: {__from: "getRunDescriptorWithExplanation",
            parameterGetters: getParametersThrowingException(),
        },
            getRunDescriptorCheckingException: {__from: "getRunDescriptorThrowingException",
                thrown: EXCEPTION_IDENTIFIER_ACTUALLY_THROWN
            },
                getRunDescriptorNotTriggeringSideEffect: {__from: "getRunDescriptorWithExplanation",
                    parameterGetters: getParametersWithoutSideEffects(),
                    returnValueGetter: getReturnValueSideEffect
                },
                getRunDescriptorParametersAndExplanationSet: {__from: "getRunDescriptorWithExplanation",
                    parameterGetters: getParameters(),
                },
                    getRunDescriptorCorrectlyBuilt: {__from: "getRunDescriptorParametersAndExplanationSet",
                        returnValueGetter: getReturnValue
                    },
                        getRunDescriptorWithReturnValueCheckFailing: {__from: "getRunDescriptorCorrectlyBuilt",
                            returnValueChecks: [getReturnValueCheckFailing()]
                        },
                        getRunDescriptorWithSideEffectCheckCheckFailing: {__from: "getRunDescriptorCorrectlyBuilt",
                            sideEffectChecks:[getSideEffectCheckCaseFailing()]
                        },
                    getRunDescriptorWithOtherreturnValue: {__from: "getRunDescriptorParametersAndExplanationSet",
                        returnValueGetter: getReturnValueOther()
                    },
                    getRunDescriptorThrowingAnotherException: {__from: "getRunDescriptorParametersAndExplanationSet",
                        parameterGetters: getParametersThrowingException(),
                        thrown: NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN
                    },
                    getRunDescriptorThrowing: {__from: "getRunDescriptorParametersAndExplanationSet",
                        thrown: NONEXISTING_EXCEPTION_IDENTIFIER
                    },
                    getRunDescriptorwithParametersReturnAndSideeffectcheck: {__from: "getRunDescriptorParametersAndExplanationSet",
                        returnValueGetter: getReturnValue,
                        returnValueChecks: [],
                        sideEffectChecks: [getSideEffectCheckCase()],
                    },
                        getRunDescriptorWithTripleReturn: {__from: "getRunDescriptorwithParametersReturnAndSideeffectcheck",
                            explanation: "triple return",
                            returnValueGetter: () => "3",
                            sideEffectChecks: [],
                        },
}, () => new RunDescriptorEntity<TestedFunctionType>())
