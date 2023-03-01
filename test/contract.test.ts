import { SideEffectChecker } from "src/SideEffectChecker";
import { Shall } from "../src/Shall";

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

describe("Contract define the contract for a function", () => {

    test("contracts can be checked", () => {
        new Shall(testedFunction)
        .ifCalledWith(1,"a")
        .thenReturn("1")
        .suchThat(
            "the return value is the string representation of the first parameter",
            (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
            )
        .meanwhile("logs to console", new SeChecker())
        .check()
    });

    test("if the return value does not correspond to the contract, an error is thrown", () => {
        
        const check =  () => new Shall(testedFunction)
        .ifCalledWith(1,"a")
        .thenReturn("1a")
        .check()
        
        expect(check).toThrow(new RegExp('expect.*toEqual'))
    });

});
