import { Contract } from "../../src/cdd-ts.js";
import { checkThrow } from "../../src/util/checkThrow.js";
import { checkThrowAsync } from "../../src/util/checkThrowAsync.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { ParameterTestData } from "../../testdata/ParametersTestData.js";

export const checkThrowContractParties = [checkThrow, checkThrowAsync];
const NO_EXCEPTION = "no exception was thrown";
const FIRST_ARG_CANNOT_BE_ULL = "first arg cannot be two";
export const checkThrowContract = new Contract<typeof checkThrow>()
  .setTitle("checks if an exception is thrown")

  .ifCalledWith(
    TestedFunctionTestData.default,
    ParameterTestData.defaultSimple,
    LabelTestdata.default,
    ParameterTestData.defaultFirst
  )
  .thenThrow(
    "If no exception is thrown by the sut, it is an error",
    NO_EXCEPTION
  )

  .ifCalledWith(
    TestedFunctionTestData.default,
    ParameterTestData.throwingSimple,
    LabelTestdata.exceptionThrown,
    ParameterTestData.defaultFirst
  )
  .thenReturn(
    "if the expected exception was thrown, return the returned parameter",
    ParameterTestData.defaultFirst
  )

  .ifCalledWith(
    TestedFunctionTestData.default,
    ParameterTestData.throwingSimple,
    LabelTestdata.default,
    ParameterTestData.defaultFirst
  )
  .thenThrow(
    "if an unexpected exception was thrown, return that",
    FIRST_ARG_CANNOT_BE_ULL
  );
