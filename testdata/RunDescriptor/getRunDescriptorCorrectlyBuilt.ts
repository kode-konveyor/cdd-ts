import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorParametersAndExplanationSet } from "./getRunDescriptorParametersAndExplanationSet";
import { getReturnValue } from "../ReturnValue/getReturnValue";


export function getRunDescriptorCorrectlyBuilt(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorParametersAndExplanationSet();
    runDescriptor.returnValueGetter = getReturnValue;
    return runDescriptor;
}
