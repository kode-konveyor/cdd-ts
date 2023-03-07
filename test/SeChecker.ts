import { SideEffectChecker } from "src/contract/SideEffectChecker";

export const GLobalObject = {
    value: [] as any[]
}

export class SeChecker implements SideEffectChecker<(a1: number, a2: number) => number> {

    expected: any[];

    constructor(expected: any[]) {
        this.expected = expected;
    }

    setUp = () => {
        GLobalObject.value = []
    };

    check() {
        expect(GLobalObject.value).toEqual(this.expected);
    }

    tearDown = () => {
    };

}
