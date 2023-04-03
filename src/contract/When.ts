import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { EnvironmentManipulatorType } from "../types/EnvironmentManipulatorType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";

export class When<T extends MethodType> extends ContractEntity<T>{

    when<R extends ContractEntity<T>>(
        explanation: string,
        environmentManipulator: EnvironmentManipulatorType
    ):R  {
        if (this.currentRun != null) {
            const currentCase = (this.currentCase != null) ? this.currentCase : "";
            if(this.cases[currentCase] === undefined) {
                this.cases[currentCase] = new CaseDescriptorEntity()
            }
            (this.cases[currentCase] as CaseDescriptorEntity<T>).runs.push(this.currentRun);
        }

        this.currentCase = explanation;
        const caseDescriptor = new CaseDescriptorEntity();
        caseDescriptor.setUp = environmentManipulator.setUp;
        caseDescriptor.tearDown = environmentManipulator.tearDown;
        this.cases[explanation] = caseDescriptor;
        this.currentRun = undefined;
        return this as unknown as R;
    }
}