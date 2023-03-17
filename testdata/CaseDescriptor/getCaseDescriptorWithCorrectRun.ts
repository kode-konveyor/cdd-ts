import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity";
import { MethodType } from "../../src/types/MethodType";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt";
import { getCaseDescriptor } from "./getCaseDescriptor";


export function getCaseDescriptorWithCorrectRun(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptor();
    caseDescriptor.runs.push(getRunDescriptorCorrectlyBuilt());
    return caseDescriptor;
}
