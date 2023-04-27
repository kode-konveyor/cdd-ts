import { Contract } from "../src/contract/Contract.js";
import type { TestedFunctionType } from "../testdata/MethodTestData.js";
import { TestedFunctionTestData } from "../testdata/MethodTestData.js";
import { ParameterTestData } from "../testdata/ParameterTestData.js";
import { ReturnValueCheckTestData } from "../testdata/ReturnValueCheckTestData.js";
import { getReturnValueTestData } from "../testdata/ReturnValueTestData.js";

export const testedFunctionContractParties = [TestedFunctionTestData.default()];

export const testedFunctionContract = new Contract<TestedFunctionType>()
  .setTitle("A nice tested functions")
  .ifCalledWith(ParameterTestData.defaultFirst, ParameterTestData.defaultSecond)
  .thenReturn("returns the first parameter as string", {
    default: getReturnValueTestData.getReturnValue,
    check: ReturnValueCheckTestData.returnValueIsStringOfParameter,
  })
  .meanwhile(
    "this is a side effect check without setUp and tearDown, just to flex that we can do that",
    {
      check() {
        return undefined;
      },
    }
  );
