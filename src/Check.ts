import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class Check<T extends SutType> extends ShallEntity<T> {
    checkedCase!: string;

    check() {
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
                this.handleCase(currentRun)
                checked++;
            })
            if(thisCase.tearDown)
                thisCase.tearDown()
        }
        return checked
    }

    private caseName(): string {
        return this.explanation+":"+this.checkedCase
    }

    private handleCase(currentRun: RunDescriptorEntity<T>) {
        if (currentRun.parameters === undefined)
            throw new Error();
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
            return
        }
        if (currentRun.thrown)
            throw new Error( this.caseName() + ": Exception expected but not thrown");
        this.checkReturnValue(currentRun,result);
        this.runReturnValueChecks(currentRun);
        this.runSideEffectChecks(currentRun);
    }

    private handleException(currentRun: RunDescriptorEntity<T>, catched: unknown) {
        const cc = this.currentCase? this.currentCase: ""
        if (currentRun.thrown === undefined) {
            throw new Error(this.caseName() + ": unexpected exception:" + catched);
        }
        if(!String(catched).match(currentRun.thrown))
            throw new Error(this.caseName()+":expected exception not thrown. Got:"+ catched)
    }

    private checkReturnValue(currentRun: RunDescriptorEntity<T>, result: ReturnType<T>) {
        if (result !== currentRun.returnValue)
            throw new Error(
                this.caseName() + ": return value mismatch:" +
                "\nexpected:" + currentRun.returnValue +
                "\nactual:" + result);
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
}
