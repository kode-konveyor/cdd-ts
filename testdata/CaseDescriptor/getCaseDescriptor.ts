import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity.js";
import { MethodType } from "../../src/types/MethodType.js";


export function getCaseDescriptor(): CaseDescriptorEntity<MethodType> {
    return new CaseDescriptorEntity();
}
