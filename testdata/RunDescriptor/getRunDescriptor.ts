import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";


export function getRunDescriptor(): RunDescriptorEntity<TestedFunctionType> {
    return new RunDescriptorEntity<TestedFunctionType>();

}
