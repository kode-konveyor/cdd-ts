import { RunDescriptorEntity } from "../RunDescriptorEntity";
import { ContractEntity } from "../ContractEntity";
import { SutType } from "../SutType";
import { CaseName } from "./CaseName";
import { autoInjectable, inject } from "tsyringe";
import { HandleRun } from "./HandleRun";

@autoInjectable()
export class Check<T extends SutType>  {
    caseName: (contract: ContractEntity<T>) => string;
    handleRun: (contract: ContractEntity<T>, currentRun: RunDescriptorEntity<T>) => number;

    constructor(
        caseName:CaseName<T>,
        handleRun: HandleRun<T>
        ) {
        this.caseName = caseName.caseName;
        this.handleRun = handleRun.handleRun;
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
                checked += this.handleRun(contract,currentRun)
            })
            if(contractCase.tearDown)
                contractCase.tearDown()
        }
        return checked
    }
}
