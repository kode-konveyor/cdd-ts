import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getParametersWithoutSideEffects } from "../Parameters/getParametersWithoutSideEffects";
import { getRunDescriptorWithExplanation } from "./getRunDescriptorWithExplanation";
import { getReturnValueSideEffect } from "../ReturnValue/getReturnValueSideEffect";


export function getRunDescriptorNotTriggeringSideEffect(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorWithExplanation();
    runDescriptor.parameterGetters = getParametersWithoutSideEffects();
    runDescriptor.returnValueGetter = getReturnValueSideEffect;
    return runDescriptor;
}
