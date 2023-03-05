import { SideEffectChecker } from "src/SideEffectChecker";


export class SeChecker implements SideEffectChecker<(a1: number, a2: number) => number> {

    oldLog!: (...data: any[]) => void;
    expected: any[];
    received: any[];

    constructor(expected: any[]) {
        this.expected = expected;
        this.received = [];
    }

    setUp = () => {
        this.received = [];
        this.oldLog = console.log;
        console.log = (...params) => { this.received.push(params); };
    };

    check() {
        expect(this.expected).toEqual(this.received);
    }
    tearDown = () => {
        console.log = this.oldLog;
    };

}
