import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getParameters } from "../Parameters/getParameters";
import { getRunDescriptor } from "./getRunDescriptor";


export function getRunDescriptorParametersSet(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptor();
    runDescriptor.parameterGetters = getParameters();
    return runDescriptor;
}
