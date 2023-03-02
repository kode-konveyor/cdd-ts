import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class ThenThrow<T extends SutType> extends ShallEntity<T> {
    thenThrow(expectedRegex: string) {
        this.thrown = expectedRegex;
        return this;
    }
}
