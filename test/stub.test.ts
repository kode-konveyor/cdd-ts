import { Contract } from "src/Contract";
import { SeChecker } from "./SeChecker";

function callerFunction(arg: number, fun:(arg: number, arg2: string) => string) {
    return fun(arg,"text")
}

describe("The contract can be used as a stub", () => {

    test("contracts can be used for stub", () => {

        const calledContract = new Contract("A nice tested function")
            .ifCalledWith(1,"text")
            .thenReturn("returns the first argument as string","1")
            .suchThat(
                "the return value is the string representation of the first parameter",
                (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
                )
            .meanwhile("logs to console", new SeChecker([["hello a"]]))

        new Contract("Caller function")
            .ifCalledWith(1,calledContract.stub())
            .thenReturn("returns the return value of the called function","1").check(callerFunction)

    });

});