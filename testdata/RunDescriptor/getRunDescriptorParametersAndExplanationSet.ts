import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getParameters } from "../Parameters/getParameters.js";
import { getRunDescriptorWithExplanation } from "./getRunDescriptorWithExplanation.js";


export function getRunDescriptorParametersAndExplanationSet(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorWithExplanation();
    runDescriptor.parameterGetters = getParameters();
    return runDescriptor;
}
