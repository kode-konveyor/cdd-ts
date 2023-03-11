import "reflect-metadata"
import { autoInjectable } from "tsyringe";
import { HandleRun } from "./HandleRun";
import { ContractEntity } from "../contract/ContractEntity";
import { SutType } from "../contract/SutType";

@autoInjectable()
export class Check<T extends SutType>  {

    constructor(
        readonly handleRun: HandleRun<T>
        ) {
    }
    check(contract: ContractEntity<T>, sut: T) {
        contract.testedFunction = sut
        let checked = 0;
        if(contract.currentRun) {
            const currentCase = (contract.currentCase)? contract.currentCase : "";
            contract.cases[currentCase].runs.push(contract.currentRun)
        }
        for(const casename in contract.cases) {
            const contractCase = contract.cases[casename];
            contract.checkedCase = casename
            if(contractCase.setUp)
                contractCase.setUp()
            contractCase.runs.forEach(currentRun => {
                console.log(this)
                checked += this.handleRun.handleRun(contract,currentRun)
            })
            if(contractCase.tearDown)
                contractCase.tearDown()
        }
        return checked
    }
}
