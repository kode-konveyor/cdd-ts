import { Contract } from "../src/contract/Contract.js";
import { getMethod, TestedFunctionType } from "../testdata/MethodTestData.js";
import { getParameters } from "../testdata/ParametersTestData.js";
import { getReturnValue } from "../testdata/ReturnValueTestData.js";
import { getSideEffectChecker } from "../testdata/SideEffectCheckerTestData.js";

export const testedFunctionContractParties = [getMethod()]

export const testedFunctionContract = new Contract<TestedFunctionType>()
    .setTitle("A nice tested functions")
    .ifCalledWith(...getParameters())
    .thenReturn("returns the first parameter as string", getReturnValue)
    .suchThat(
        "the return value is the string representation of the first parameter",
        (returnValue: string, parameter1: number, parameter2: string) => (returnValue === String(parameter1))?undefined:"fail"
    )
    .meanwhile("logs to console", getSideEffectChecker());
