import { ContractEntity } from "../types/ContractEntity";
import { MethodType } from "../types/MethodType";
import { EnvironmentManipulatorType } from "../types/EnvironmentManipulatorType";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity";
import { messageFormat } from "../util/messageFormat";

export function when<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    environmentManipulator: EnvironmentManipulatorType
): THIS {
    if (this.currentRun != null) {
        const currentCase = (this.currentCase != null) ? this.currentCase : "";
        const lastCase = this.cases[currentCase];
        if (lastCase == null)
            throw new Error(messageFormat("no such case:" + currentCase + JSON.stringify(this)))
        lastCase.runs.push(this.currentRun);
    }

    this.currentCase = explanation;
    const caseDescriptor = new CaseDescriptorEntity();
    caseDescriptor.setUp = environmentManipulator.setUp;
    caseDescriptor.tearDown = environmentManipulator.tearDown;
    this.cases[explanation] = caseDescriptor;
    this.currentRun = undefined;
    return this;
}
