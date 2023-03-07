import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export class Check<T extends SutType>  {

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

    private caseName(contract: ContractEntity<T>): string {
        return contract.explanation+":"+contract.checkedCase+":"+contract.currentRunExplanation
    }

    private handleRun(contract: ContractEntity<T>,currentRun: RunDescriptorEntity<T>) {
        contract.currentRunExplanation = currentRun.explanation
        if (currentRun.parameters === undefined)
            throw new Error(this.caseName(contract)+": no ifcalledWith");
        const returnValue = currentRun.returnValue;
        const thrown = currentRun.thrown;
        this.setUpSideEffectChecks(contract,currentRun);
        let result;
        let catched;
        try {
            const parameters:Parameters<T> = currentRun.parameters;
            result = contract.testedFunction(...parameters);
        } catch (e) {
            this.handleException(contract,currentRun, e);
            return 1
        }
        if (currentRun.thrown)
            throw new Error( this.caseName(contract) + ": Exception expected but not thrown");
        this.checkReturnValue(contract, currentRun,result);
        this.runReturnValueChecks(contract,currentRun);
        this.runSideEffectChecks(contract,currentRun);
        return 1
    }

    private handleException(contract: ContractEntity<T>,currentRun: RunDescriptorEntity<T>, catched: unknown) {
        if (currentRun.thrown === undefined) {
            throw new Error(this.caseName(contract) + ": unexpected exception:" + catched);
        }
        if(!String(catched).match(currentRun.thrown))
            throw new Error(this.caseName(contract)+":Not the expected exception thrown. Got:"+ catched)
    }

    private checkReturnValue(contract: ContractEntity<T>,currentRun: RunDescriptorEntity<T>, result: ReturnType<T>) {
        if (result !== currentRun.returnValue)
            throw new Error(
                this.caseName(contract) + ": return value mismatch:" +
                "\nexpected:" + currentRun.returnValue +
                "\nactual:" + result);
    }

    private setUpSideEffectChecks(contract: ContractEntity<T>,currentRun: RunDescriptorEntity<T>) {
        contract.sideEffectChecks.forEach(
            (entry) => {
                entry[1].setUp();
            }
        )
        currentRun.sideEffectChecks.forEach(
            (entry) => {
                entry[1].setUp();
            }
        );
    }

    private runSideEffectChecks(contract: ContractEntity<T>,currentRun: RunDescriptorEntity<T>) {
        contract.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.caseName(contract) + ": side effect check: " + entry[0] + ": did not hold:"+error);
                }
                entry[1].tearDown();
            }
        );
        currentRun.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.caseName(contract) + ": side effect check: " + entry[0] + ": did not hold:"+error);
                }
                entry[1].tearDown();
            }
        );
    }

    private runReturnValueChecks(contract: ContractEntity<T>,currentRun: RunDescriptorEntity<T>) {
        currentRun.returnValueChecks.forEach(
            entry => {
                try {
                    entry[1](currentRun.returnValue as ReturnType<T>, ...(currentRun.parameters as Parameters<T>));
                } catch (error) {
                    throw new Error(this.caseName(contract) + ": " + entry[0] + ": return value check did not hold:" + error);
                }
            }
        );
    }
}
