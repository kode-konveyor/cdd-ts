import { Contract } from "../src/contract/Contract";
import { getMethod } from "../testdata/Method/getMethod";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType";
import { SeChecker } from "../testdata/SideEffectChecker/SeChecker";

export const testedFunctionContractParties = [getMethod()]

export const testedFunctionContract = new Contract<TestedFunctionType>()
    .setTitle("A nice tested functions")
    .ifCalledWith(() => 1, () => "a")
    .thenReturn("returns the first parameter as string", () => "1")
    .suchThat(
        "the return value is the string representation of the first parameter",
        (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
    )
    .meanwhile("logs to console", new SeChecker([["hello a"]]));
