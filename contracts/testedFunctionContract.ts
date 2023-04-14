import { Contract } from "../src/contract/Contract.js";
import type { TestedFunctionType } from "../testdata/MethodTestData.js";
import { TestedFunctionTestData } from "../testdata/MethodTestData.js";
import { ParameterTestData } from "../testdata/ParametersTestData.js";
import { getReturnValueTestData } from "../testdata/ReturnValueTestData.js";

export const testedFunctionContractParties = [TestedFunctionTestData.default()];

export const testedFunctionContract = new Contract<TestedFunctionType>()
  .setTitle("A nice tested functions")
  .ifCalledWith(ParameterTestData.defaultFirst, ParameterTestData.defaultSecond)
  .thenReturn(
    "returns the first parameter as string",
    getReturnValueTestData.getReturnValue
  )
  .suchThat(
    "the return value is the string representation of the first parameter",
    (returnValue: string, parameter1: number) =>
      returnValue === String(parameter1) ? undefined : "fail"
  );
