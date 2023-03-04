import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class ThenThrow<T extends SutType> extends ShallEntity<T> {
    thenThrow(expectedRegex: string):this {
        if(!this.currentRun)
            throw new Error("thenThrow can only be used after an ifCalledWith")
        this.currentRun.thrown = expectedRegex;
        return this;
    }
}
