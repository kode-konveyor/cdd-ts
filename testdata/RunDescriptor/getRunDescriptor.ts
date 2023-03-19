import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";


export function getRunDescriptor(): RunDescriptorEntity<TestedFunctionType> {
    return new RunDescriptorEntity<TestedFunctionType>();

}
