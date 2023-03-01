import { Shall } from "../src/Shall"
import { SideEffectChecker } from "../src/SideEffectChecker"

export function testedFunction(arg:number, arg2: string) {
    return String(arg)
}

export class SeChecker implements SideEffectChecker<(a1:number,a2:number)=> number> {
    setUp(): undefined {
        throw new Error("Method not implemented.")
    }
    test(): undefined {
        throw new Error("Method not implemented.")
    }
    tearDown(): undefined {
        throw new Error("Method not implemented.")
    }

}
