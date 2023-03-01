import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class SuchThat<T extends SutType> extends ShallEntity<T> {
    suchThat(explanation: string, checker: (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => boolean) {
        this.returnValueChecks.push([explanation, checker]);
        return this;
    }
}
