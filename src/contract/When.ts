import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";
import { EnvironmentManipulator } from "./EnvironmentManipulator";
import { CaseDescriptorEntity } from "./CaseDescriptorEntity";

export function when<T extends SutType,THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    environmentManipulator: EnvironmentManipulator
):THIS {
    if (this.currentRun != null) {
        const currentCase = (this.currentCase != null) ? this.currentCase : "";
        this.cases[currentCase].runs.push(this.currentRun);
    }

    this.currentCase = explanation;
    const caseDescriptor = new CaseDescriptorEntity();
    caseDescriptor.setUp = environmentManipulator.setUp;
    caseDescriptor.tearDown = environmentManipulator.tearDown;
    this.cases[explanation] = caseDescriptor;
    this.currentRun = undefined;
    return this;
}
