import equal = require("fast-deep-equal");
import { BeThat } from "../src/BeThat";
import { SeChecker } from "./SeChecker";
import { testedFunction } from "./testedFunction";

function callerFunction(arg: number, fun:(arg: number, arg2: string) => string) {
    return fun(arg,"text")
}

describe("The contract can be used as a stub", () => {

    test("foo",() => {
        expect(equal([1,"foo"],[1,"foo"])).toBe(true)
    })
    test("contracts can be used for stub", () => {

        const calledContract = new BeThat("A nice tested function",testedFunction)
            .ifCalledWith(1,"text")
            .thenReturn("1")
            .suchThat(
                "the return value is the string representation of the first parameter",
                (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
                )
            .meanwhile("logs to console", new SeChecker([["hello a"]]))

        new BeThat("Caller function", callerFunction)
            .ifCalledWith(1,calledContract.stub())
            .thenReturn("1").check()

    });

});