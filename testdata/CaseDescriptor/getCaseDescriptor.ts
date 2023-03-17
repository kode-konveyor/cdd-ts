import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity";
import { MethodType } from "../../src/types/MethodType";


export function getCaseDescriptor(): CaseDescriptorEntity<MethodType> {
    return new CaseDescriptorEntity();
}
