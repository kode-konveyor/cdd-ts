import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity.js";
import { MethodType } from "../../src/types/MethodType.js";
import { getRunDescriptorWithTripleReturn } from "../RunDescriptor/getRunDescriptorWithTripleReturn.js";
import { getCaseDescriptorWithManipulatorset } from "./getCaseDescriptorWithManipulatorset.js";


export function getCaseDescriptorWithManipulatorsetAndRun(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptorWithManipulatorset();
    caseDescriptor.runs.push(getRunDescriptorWithTripleReturn());
    return caseDescriptor;
}
