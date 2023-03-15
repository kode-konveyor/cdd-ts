import { CaseDescriptorEntity } from "../src/contract/CaseDescriptorEntity";
import { MethodType } from "../src/contract/MethodType";
import { manipulator } from "./ContractTestdata";
import { getRunDescriptorCorrectlyBuilt, getRunDescriptorWithTripleReturn } from "./RunDescriptorTestData";

export function getCaseDescriptor(): CaseDescriptorEntity<MethodType> {
    return new CaseDescriptorEntity();
}

export function getCaseDescriptorWithCorrectRun(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptor()
    caseDescriptor.runs.push(getRunDescriptorCorrectlyBuilt())
    return caseDescriptor;
}

export function getCaseDescriptorWithManipulatorset(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptor()
    caseDescriptor.setUp = manipulator.setUp
    caseDescriptor.tearDown = manipulator.tearDown
    return caseDescriptor;
}

export function getCaseDescriptorWithManipulatorsetAndRun(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptorWithManipulatorset()
    caseDescriptor.runs.push(getRunDescriptorWithTripleReturn())
    return caseDescriptor;
}
