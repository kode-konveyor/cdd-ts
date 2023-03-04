import equal = require("fast-deep-equal");
import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class Stub<T extends SutType> extends ShallEntity<T> {
    stub(caseName?: string): T {
        if (caseName === undefined) 
            caseName = ""
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
    
        const currentCase = this.cases[caseName];

        const stub = (...params: Parameters<T>) =>
        {
            const retvals:ReturnType<T>[] = []
            currentCase.runs.forEach( run => {
                if(equal(run.parameters, params))
                  if(run.thrown === undefined)
                    retvals.push(run.returnValue as ReturnType<T>)
                   else
                     throw new Error(run.thrown)
            })
            if(retvals.length != 1)
                throw new Error("those parameters are not defined exactly once for this case:\n"+
                    params+"\n"+retvals.length)
            return retvals[0]
        }
        return stub as T;
    }
}
