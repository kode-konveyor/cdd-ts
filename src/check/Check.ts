import { HandleRun } from "./HandleRun.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";


export class Check <T extends MethodType> extends ContractEntity<T> {
    constructor(
        readonly handleRun =  HandleRun.prototype.handleRun
    ) {
        super();
    }

    check(sut: T): number {
        this.testedFunction = sut
        let checked = 0;
        if (this.currentRun != null) {
            const currentCase = (this.currentCase != null) ? this.currentCase : "";
            if(this.cases[currentCase] === undefined) {
                this.cases[currentCase] = new CaseDescriptorEntity()
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            (this.cases[currentCase] as CaseDescriptorEntity<T>).runs.push(this.currentRun)
        }
        for (const casename in this.cases) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const thisCase:CaseDescriptorEntity<T> = this.cases[casename] as CaseDescriptorEntity<T>;
            this.checkedCase = casename
            if (thisCase.setUp != null)
                thisCase.setUp()
            thisCase.runs.forEach(currentRun => {
                checked += this.handleRun(currentRun)
            })
            if (thisCase.tearDown != null)
                thisCase.tearDown()
        }
        if(checked === 0) {
            throw new Error(messageFormat("no checks in contract {1}",this.explanation))
        }
        return checked
    }
}