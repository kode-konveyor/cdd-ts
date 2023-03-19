import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptor } from "./getRunDescriptor.js";


export function getRunDescriptorWithExplanation(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptor();
    runDescriptor.explanation = "run explanation";
    return runDescriptor;

}
