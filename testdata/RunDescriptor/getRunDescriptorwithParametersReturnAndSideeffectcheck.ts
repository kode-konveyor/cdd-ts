import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { getSideEffectCheckCase } from "../SideEffectCheckCase/getSideEffectCheckCase.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorParametersAndExplanationSet } from "./getRunDescriptorParametersAndExplanationSet.js";
import { getReturnValue } from "../ReturnValue/getReturnValue.js";


export function getRunDescriptorwithParametersReturnAndSideeffectcheck(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorParametersAndExplanationSet();
    runDescriptor.returnValueGetter = getReturnValue;
    runDescriptor.returnValueChecks = [];
    runDescriptor.sideEffectChecks = [getSideEffectCheckCase()];
    return runDescriptor;
}
