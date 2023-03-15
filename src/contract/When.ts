import { ContractEntity } from "./ContractEntity";
import { MethodType } from "./MethodType";
import { EnvironmentManipulator } from "./EnvironmentManipulator";
import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { messageFormat } from "src/util/messageFormat";

export function when<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS,
    explanation: string,
    environmentManipulator: EnvironmentManipulator
): THIS {
    if (this.currentRun != null) {
        const currentCase = (this.currentCase != null) ? this.currentCase : "";
        const lastCase = this.cases[currentCase];
        if(lastCase == null )
            throw new Error(messageFormat("no such case:"+currentCase+JSON.stringify(this)))
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
