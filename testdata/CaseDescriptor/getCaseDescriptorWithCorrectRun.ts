import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity.js";
import { MethodType } from "../../src/types/MethodType.js";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt.js";
import { getCaseDescriptor } from "./getCaseDescriptor.js";


export function getCaseDescriptorWithCorrectRun(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptor();
    caseDescriptor.runs.push(getRunDescriptorCorrectlyBuilt());
    return caseDescriptor;
}
