import { Contract } from "../src/contract/Contract.js";
import { getMethod } from "../testdata/Method/getMethod.js";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType.js";
import { getParameters } from "../testdata/Parameters/getParameters.js";
import { getReturnValue } from "../testdata/ReturnValue/getReturnValue.js";
import { getSideEffectChecker } from "../testdata/SideEffectChecker/getSideEffectChecker.js";

export const testedFunctionContractParties = [getMethod()]

export const testedFunctionContract = new Contract<TestedFunctionType>()
    .setTitle("A nice tested functions")
    .ifCalledWith(... getParameters())
    .thenReturn("returns the first parameter as string", getReturnValue)
    .suchThat(
        "the return value is the string representation of the first parameter",
        (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))
    )
    .meanwhile("logs to console", getSideEffectChecker());
