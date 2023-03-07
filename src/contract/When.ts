import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";
import { EnvironmentManipulator } from "./EnvironmentManipulator";
import { CaseDescriptorEntity } from "./CaseDescriptorEntity";

export class When<T extends SutType> extends ContractEntity<T> {
    when(explanation: string, environmentManipulator: EnvironmentManipulator): this {
        if (this.currentRun) {
            const currentCase = (this.currentCase) ? this.currentCase : "";
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
}
