import { SideEffectChecker } from "src/contract/SideEffectChecker";

export const GLobalObject = {
    value: [] as any[],
    multiplier: 1
}

export class SeChecker implements SideEffectChecker {

    expected: any[];

    constructor(expected: any[]) {
        this.expected = expected;
    }

    setUp = (): void => {
        GLobalObject.value = []
    };

    check(): void {
        expect(GLobalObject.value).toEqual(this.expected);
    }

    tearDown = ():void => {
    };

}
