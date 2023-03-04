import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class SuchThat<T extends SutType> extends ShallEntity<T> {
    suchThat(explanation: string, checker: (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void):this {
        if(this.currentRun)
            this.currentRun.returnValueChecks.push([explanation, checker]);
        else
            this.returnValueChecks.push([explanation, checker]);
        return this;
    }
}
