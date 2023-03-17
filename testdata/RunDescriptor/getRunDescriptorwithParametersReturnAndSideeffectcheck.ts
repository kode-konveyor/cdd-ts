import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { getSideEffectCheckCase } from "../SideEffectCheckCase/getSideEffectCheckCase";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorParametersAndExplanationSet } from "./getRunDescriptorParametersAndExplanationSet";
import { getReturnValue } from "../ReturnValue/getReturnValue";


export function getRunDescriptorwithParametersReturnAndSideeffectcheck(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorParametersAndExplanationSet();
    runDescriptor.returnValueGetter = getReturnValue;
    runDescriptor.returnValueChecks = [];
    runDescriptor.sideEffectChecks = [getSideEffectCheckCase()];
    return runDescriptor;
}
