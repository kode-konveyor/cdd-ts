import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity.js";
import { MethodType } from "../../src/types/MethodType.js";
import { getEnvironmentManipulatorThrice } from "../EnvironmentManipulator/getEnvironmentManipulatorThrice.js";
import { getCaseDescriptor } from "./getCaseDescriptor.js";


export function getCaseDescriptorWithManipulatorset(): CaseDescriptorEntity<MethodType> {
    const caseDescriptor = getCaseDescriptor();
    const manipulator = getEnvironmentManipulatorThrice();
    caseDescriptor.setUp = manipulator.setUp;
    caseDescriptor.tearDown = manipulator.tearDown;
    return caseDescriptor;
}
