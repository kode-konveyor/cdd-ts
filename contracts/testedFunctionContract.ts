import { Contract } from "../src/contract/Contract";
import { getMethod } from "../testdata/Method/getMethod";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType";
import { getParameters } from "../testdata/Parameters/getParameters";
import { getReturnValue } from "../testdata/ReturnValue/getReturnValue";
import { getSideEffectChecker } from "../testdata/SideEffectChecker/getSideEffectChecker";

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
