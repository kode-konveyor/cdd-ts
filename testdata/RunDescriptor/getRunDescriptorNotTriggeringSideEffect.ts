import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getParametersWithoutSideEffects } from "../Parameters/getParametersWithoutSideEffects.js";
import { getRunDescriptorWithExplanation } from "./getRunDescriptorWithExplanation.js";
import { getReturnValueSideEffect } from "../ReturnValue/getReturnValueSideEffect.js";


export function getRunDescriptorNotTriggeringSideEffect(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorWithExplanation();
    runDescriptor.parameterGetters = getParametersWithoutSideEffects();
    runDescriptor.returnValueGetter = getReturnValueSideEffect;
    return runDescriptor;
}
