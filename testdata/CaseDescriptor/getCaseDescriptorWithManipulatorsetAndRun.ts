import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity";
import { MethodType } from "../../src/types/MethodType";
import { getRunDescriptorWithTripleReturn } from "../RunDescriptor/getRunDescriptorWithTripleReturn";
import { getCaseDescriptorWithManipulatorset } from "./getCaseDescriptorWithManipulatorset";


export function getCaseDescriptorWithManipulatorsetAndRun(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptorWithManipulatorset();
    caseDescriptor.runs.push(getRunDescriptorWithTripleReturn());
    return caseDescriptor;
}
