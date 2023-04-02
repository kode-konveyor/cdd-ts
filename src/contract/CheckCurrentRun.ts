import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { CaseName } from "../check/CaseName.js";
import { messageFormat } from "../util/messageFormat.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";

type WithCorrectRun<T extends MethodType, K extends ContractEntity<T>> = K & Required<{currentRun: RunDescriptorEntity<T>}>

export class CheckCurrentRun<T extends MethodType> extends ContractEntity<T> {
    constructor(
        readonly caseName = CaseName.prototype.caseName

    ) {
        super();
    }

    checkCurrentRun(): WithCorrectRun<T,this> {
        if (this.currentRun !== undefined) {
            if (this.currentRun.returnValueGetter === undefined && this.currentRun.thrown == null)
                throw new Error(messageFormat(
                    "{1}: current run is incomplete: neither thenReturn nor thenThrow was called",
                    this.caseName()));
            const currentCase = (this.currentCase != null) ? this.currentCase : "";
            if (this.cases[currentCase] == null) {
                this.cases[currentCase] = new CaseDescriptorEntity();
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            (this.cases[currentCase] as CaseDescriptorEntity<T>).runs.push(this.currentRun);
            this.currentRun = undefined
        }
        return this as WithCorrectRun<T,this>
    }
}
