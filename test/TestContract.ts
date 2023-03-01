import { Shall } from "../src/Shall"
import { SideEffectChecker } from "../src/SideEffectChecker"

function testedFunction(arg:number, arg2: string) {
    return String(arg)
}

function testedFunction2(arg1:number, arg2:number) {
    return arg1+arg2
}

class SeChecker implements SideEffectChecker<(a1:number,a2:number)=> number> {
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

export const contract = new Shall(testedFunction)
.ifCalledWith(1,"a")
.thenReturn("1")
.suchThat(
    "the return value is the string representation of the first parameter",
    (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
    )
    .meanwhile("logs to console", new SeChecker())

new Shall(testedFunction2)
.ifCalledWith(1,2)
.thenReturn(3)