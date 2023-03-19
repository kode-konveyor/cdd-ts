import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorwithParametersReturnAndSideeffectcheck } from "./getRunDescriptorwithParametersReturnAndSideeffectcheck.js";


export function getRunDescriptorWithTripleReturn(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorwithParametersReturnAndSideeffectcheck();
    runDescriptor.explanation = "triple return";
    runDescriptor.returnValueGetter = () => "3";
    runDescriptor.sideEffectChecks.pop();
    return runDescriptor;
}
