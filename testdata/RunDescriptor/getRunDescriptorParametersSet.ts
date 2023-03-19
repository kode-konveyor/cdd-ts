import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getParameters } from "../Parameters/getParameters.js";
import { getRunDescriptor } from "./getRunDescriptor.js";


export function getRunDescriptorParametersSet(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptor();
    runDescriptor.parameterGetters = getParameters();
    return runDescriptor;
}
