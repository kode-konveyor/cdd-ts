import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export class Check<T extends SutType> extends ContractEntity<T> {
    checkedCase!: string;
    currentRunExplanation!: string;

    check(sut: T) {
        this.testedFunction = sut
        let checked = 0;
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
        for(const casename in this.cases) {
            const thisCase = this.cases[casename];
            this.checkedCase = casename
            if(thisCase.setUp)
                thisCase.setUp()
            thisCase.runs.forEach(currentRun => {
                checked += this.handleRun(currentRun)
            })
            if(thisCase.tearDown)
                thisCase.tearDown()
        }
        return checked
    }

    private caseName(): string {
        return this.explanation+":"+this.checkedCase+":"+this.currentRunExplanation
    }

    private handleRun(currentRun: RunDescriptorEntity<T>) {
        this.currentRunExplanation = currentRun.explanation
        if (currentRun.parameters === undefined)
            throw new Error(this.caseName()+": no ifcalledWith");
        const returnValue = currentRun.returnValue;
        const thrown = currentRun.thrown;
        this.setUpSideEffectChecks(currentRun);
        let result;
        let catched;
        try {
            const parameters:Parameters<T> = currentRun.parameters;
            result = this.testedFunction(...parameters);
        } catch (e) {
            this.handleException(currentRun, e);
            return 1
        }
        if (currentRun.thrown)
            throw new Error( this.caseName() + ": Exception expected but not thrown");
        this.checkReturnValue(currentRun,result);
        this.runReturnValueChecks(currentRun);
        this.runSideEffectChecks(currentRun);
        return 1
    }

    private handleException(currentRun: RunDescriptorEntity<T>, catched: unknown) {
        if (currentRun.thrown === undefined) {
            throw new Error(this.caseName() + ": unexpected exception:" + catched);
        }
        if(!String(catched).match(currentRun.thrown))
            throw new Error(this.caseName()+":Not the expected exception thrown. Got:"+ catched)
    }

    private checkReturnValue(currentRun: RunDescriptorEntity<T>, result: ReturnType<T>) {
        if (result !== currentRun.returnValue)
            throw new Error(
                this.caseName() + ": return value mismatch:" +
                "\nexpected:" + currentRun.returnValue +
                "\nactual:" + result);
    }

    private setUpSideEffectChecks(currentRun: RunDescriptorEntity<T>) {
        this.sideEffectChecks.forEach(
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

    private runSideEffectChecks(currentRun: RunDescriptorEntity<T>) {
        this.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.caseName() + ": side effect check: " + entry[0] + ": did not hold:"+error);
                }
                entry[1].tearDown();
            }
        );
        currentRun.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.caseName() + ": side effect check: " + entry[0] + ": did not hold:"+error);
                }
                entry[1].tearDown();
            }
        );
    }

    private runReturnValueChecks(currentRun: RunDescriptorEntity<T>) {
        currentRun.returnValueChecks.forEach(
            entry => {
                try {
                    entry[1](currentRun.returnValue as ReturnType<T>, ...(currentRun.parameters as Parameters<T>));
                } catch (error) {
                    throw new Error(this.caseName() + ": " + entry[0] + ": return value check did not hold:" + error);
                }
            }
        );
    }
}
