import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorwithParametersReturnAndSideeffectcheck } from "./getRunDescriptorwithParametersReturnAndSideeffectcheck";


export function getRunDescriptorWithTripleReturn(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorwithParametersReturnAndSideeffectcheck();
    runDescriptor.explanation = "triple return";
    runDescriptor.returnValueGetter = () => "3";
    runDescriptor.sideEffectChecks.pop();
    return runDescriptor;
}
