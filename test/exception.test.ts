import { BeThat } from "../src/BeThat";
import { SeChecker } from "./SeChecker";
import { testedFunction } from "./testedFunction";

describe("Contract can define exceptions to be thrown", () => {

    test("A thrown exception can be defined with a regex for the message", () => {
        new BeThat("A throwing function",testedFunction)
        .ifCalledWith(2,"a")
        .thenThrow("cannot be two")
        .check()
    });

    test("If an exception is not expected but thrown, it is an error", () => {
        const check = () => new BeThat("A throwing function",testedFunction)
        .ifCalledWith(2,"a")
        .thenReturn("3")
        .check()

        expect(check).toThrow("A throwing function: unexpected exception")
    });

    test("If an exception is defined in the contract but not thrown, it is an error", () => {
        const check = () => 
        new BeThat("A not-throwing function",testedFunction)
        .ifCalledWith(1,"a")
        .thenThrow("cannot be two")
        .check()
        expect(check).toThrow("A not-throwing function: Exception expected but not thrown")
    });

});
