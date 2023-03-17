import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity";
import { MethodType } from "../../src/types/MethodType";
import { getEnvironmentManipulatorThrice } from "../EnvironmentManipulator/getEnvironmentManipulatorThrice";
import { getCaseDescriptor } from "./getCaseDescriptor";


export function getCaseDescriptorWithManipulatorset(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptor();
    const manipulator = getEnvironmentManipulatorThrice();
    caseDescriptor.setUp = manipulator.setUp;
    caseDescriptor.tearDown = manipulator.tearDown;
    return caseDescriptor;
}
