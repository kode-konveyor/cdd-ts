import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { EnvironmentManipulatorType } from "../types/EnvironmentManipulatorType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";

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
