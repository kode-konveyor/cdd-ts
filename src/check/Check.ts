import { handleRun } from "./HandleRun";
import { ContractEntity } from "../contract/ContractEntity";
import { MethodType } from "../contract/MethodType";


export function check<T extends MethodType, THIS extends ContractEntity<T>>(this: THIS, sut: T): number {
    this.testedFunction = sut
    let checked = 0;
    if (this.currentRun != null) {
        const currentCase = (this.currentCase != null) ? this.currentCase : "";
        this.cases[currentCase].runs.push(this.currentRun)
    }
    for (const casename in this.cases) {
        const thisCase = this.cases[casename];
        this.checkedCase = casename
        if (thisCase.setUp != null)
            thisCase.setUp()
        thisCase.runs.forEach(currentRun => {
            checked += handleRun.call(this, currentRun)
        })
        if (thisCase.tearDown != null)
            thisCase.tearDown()
    }
    return checked
}
