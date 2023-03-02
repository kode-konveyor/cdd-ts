import { Shall } from "../src/Shall";
import { SeChecker } from "./SeChecker";
import { testedFunction } from "./testedFunction";


function callerFunction(arg: number, fun:(arg: number, arg2: string) => string) {
    return fun(arg,"text")
}

describe("The contract can be used as a stub", () => {

    test("contracts can be checked", () => {

        const calledContract = new Shall("A nice tested functions",testedFunction)
            .ifCalledWith(1,"text")
            .thenReturn("1")
            .suchThat(
                "the return value is the string representation of the first parameter",
                (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
                )
            .meanwhile("logs to console", new SeChecker([["hello a"]]))

        new Shall("Caller function", callerFunction)
            .ifCalledWith(1,calledContract.stub())
            .thenReturn("1").check()

    });

});