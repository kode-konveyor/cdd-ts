import { BeThat } from "../src/BeThat";
import { SeChecker } from "../test/SeChecker";
import { testedFunction } from "../test/testedFunction";

export const testedFunctionContract = new BeThat("A nice tested functions", testedFunction)
    .ifCalledWith(1, "a")
    .thenReturn("1")
    .suchThat(
        "the return value is the string representation of the first parameter",
        (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
    )
    .meanwhile("logs to console", new SeChecker([["hello a"]]));
