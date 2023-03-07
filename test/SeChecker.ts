import { SideEffectChecker } from "src/SideEffectChecker";

interface GlobalObject {
    field: [string][]
}
export const GlobalObject:GlobalObject = {
    field: []
}

export class SeChecker implements SideEffectChecker<(a1: number, a2: number) => number> {

    expected: any[];

    constructor(expected: any[]) {
        this.expected = expected;
    }

    setUp = () => {
        GlobalObject.field = []
    };

    check() {
        expect(GlobalObject.field).toEqual(this.expected);
    }
    tearDown = () => {
    };

}
