import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class Check<T extends SutType> extends ShallEntity<T> {
    check() {
        this.sideEffectChecks.forEach(
            (entry) => {
                entry[1].setUp();
            }
        );
        let result;
        let catched;
        try {
             result = this.testedFunction(...this.parameters);
        } catch (e) {
            catched = e;
        }
        if (catched) {
            if(this.thrown === undefined)
            {
                throw new Error(this.explanation+": unexpected exception",catched)
            }
            expect(String(catched)).toMatch(this.thrown)
        } else {
            if(this.thrown)
                throw new Error(this.explanation+ ": Exception expected but not thrown")
            if (result !== this.returnValue)
                throw new Error(
                    this.explanation + ": return value mismatch:"+
                    "\nexpected:" + this.returnValue+
                    "\nactual:"+result);
        }
        this.returnValueChecks.forEach(
            entry => {
                try {
                    entry[1](this.returnValue, ...this.parameters);
                } catch (error) {
                    throw new Error(this.explanation + ": " + entry[0] + ": return value check did not hold");
                }

            }
        );
        this.sideEffectChecks.forEach(
            (entry) => {
                try {
                    entry[1].check();
                } catch (error) {
                    throw new Error(this.explanation + ": " + entry[0] + ": did not hold");
                }
                entry[1].tearDown();
            }
        );
    }
}
