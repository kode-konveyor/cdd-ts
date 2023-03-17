import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptor } from "./getRunDescriptor";


export function getRunDescriptorWithExplanation(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptor();
    runDescriptor.explanation = "run explanation";
    return runDescriptor;

}
