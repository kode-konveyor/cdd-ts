import { Contract } from "src/Contract";
import { SeChecker } from "test/SeChecker";
import { testedFunction } from "test/testedFunction";

export const testedFunctionContractParties = [testedFunction]

export const testedFunctionContract = new Contract()
    .init("A nice tested functions")
    .ifCalledWith(1, "a")
    .thenReturn("returns the first parameter as string","1")
    .suchThat(
        "the return value is the string representation of the first parameter",
        (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
    )
    .meanwhile("logs to console", new SeChecker([["hello a"]]));
