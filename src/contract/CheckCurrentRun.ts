import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { CaseName } from "../check/CaseName.js";
import { messageFormat } from "../util/messageFormat.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";

export class CheckCurrentRun<T extends MethodType> extends ContractEntity<T> {
    constructor(
        readonly caseName = CaseName.prototype.caseName

    ) {
        super();
    }

    checkCurrentRun(): void {
        if (this.currentRun !== undefined) {
            if (this.currentRun.returnValueGetter == null && this.currentRun.thrown == null)
                throw new Error(messageFormat(
                    "{1}: current run is incomplete: neither thenReturn nor thenThrow was called",
                    this.caseName()));
            const currentCase = (this.currentCase != null) ? this.currentCase : "";
            if (this.cases[currentCase] == null) {
                this.cases[currentCase] = new CaseDescriptorEntity();
            }
            this.cases[currentCase].runs.push(this.currentRun);
        }
    }
}