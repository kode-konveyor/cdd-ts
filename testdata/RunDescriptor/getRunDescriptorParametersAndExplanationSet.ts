import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getParameters } from "../Parameters/getParameters";
import { getRunDescriptorWithExplanation } from "./getRunDescriptorWithExplanation";


export function getRunDescriptorParametersAndExplanationSet(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorWithExplanation();
    runDescriptor.parameterGetters = getParameters();
    return runDescriptor;
}
