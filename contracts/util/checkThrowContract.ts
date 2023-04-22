import { Contract } from "../../src/cdd-ts.js";
import { CheckThrowService } from "../../src/util/CheckThrowService.js";
import { CheckThrowAsyncService } from "../../src/util/CheckThrowAsyncService.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { ParameterTestData } from "../../testdata/ParameterTestData.js";

export const checkThrowContractParties = [
  new CheckThrowService().checkThrow,
  new CheckThrowAsyncService().checkThrowAsync,
];

export const checkThrowContract = new Contract<
  typeof CheckThrowService.prototype.checkThrow
>()
  .setTitle("checks if an exception is thrown")

  .ifCalledWith(
    TestedFunctionTestData.default,
    ParameterTestData.defaultSimple,
    LabelTestdata.default,
    ParameterTestData.defaultFirst
  )
  .thenThrow(
    "If no exception is thrown by the sut, it is an error",
    "no exception was thrown"
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
    "first arg cannot be two"
  );
