import { mock, mockFn } from "jest-mock-extended";

import { BeThat } from "../src/BeThat";
import { SeChecker } from "./SeChecker";
import { testedFunction } from "./testedFunction";

describe("Contract define the contract for a function", () => {

    test("contracts can be checked", () => {
        new BeThat("A nice tested functions",testedFunction)
        .ifCalledWith(1,"a")
        .thenReturn("1")
        .suchThat(
            "the return value is the string representation of the first parameter",
            (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
            )
        .meanwhile("logs to console", new SeChecker([["hello a"]]))
        .check()
    });

    test("if the return value does not correspond to the contract, an error is thrown", () => {
        
        const check =  () => new BeThat("Function which is tested",testedFunction)
        .ifCalledWith(1,"a")
        .thenReturn("1a")
        .check()
        
        expect(check).toThrow('Function which is tested: return value mismatch')
    });

    test("if a return value constraint does not hold, an error is thrown", () => {
        
        const check =  () => new BeThat("For test fun",testedFunction)
        .ifCalledWith(1,"a")
        .thenReturn("1")
        .suchThat(
            "the return value is the string representation of the first parameter",
            (returnValue: string, parameter1: number, parameter2: string) => (expect(returnValue).toEqual("a"+String(parameter1)))
        )
        .check()
        
        expect(check).toThrow(new RegExp('For test fun: the return value is the string representation of the first parameter: return value check did not hold'))
    });


    test("if a side effect check does not check, an error is thrown", () => {
        
        const check =  () => new BeThat("For test fun",testedFunction)
        .ifCalledWith(1,"a")
        .thenReturn("1")
        .meanwhile("logs to console", new SeChecker([["hello b"]]))
        .check()
        
        expect(check).toThrow(new RegExp('For test fun: logs to console: did not hold'))
    });

});
