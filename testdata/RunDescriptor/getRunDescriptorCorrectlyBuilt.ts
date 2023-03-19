import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorParametersAndExplanationSet } from "./getRunDescriptorParametersAndExplanationSet.js";
import { getReturnValue } from "../ReturnValue/getReturnValue.js";


export function getRunDescriptorCorrectlyBuilt(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorParametersAndExplanationSet();
    runDescriptor.returnValueGetter = getReturnValue;
    return runDescriptor;
}
