import { Contract } from "../../src/contract/Contract.js";
import { checkNumberOfTests } from "../../src/runner/checkNumberOfTests.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { getReturnValueTestData } from "../../testdata/ReturnValueTestData.js";
import { BooleanTestData } from "../../testdata/BooleanTestData.js";

export const checkNumberOfTestsContractParties = [checkNumberOfTests];

const EXPECTED_TEN_TESTS = "expected 10 tests, got 11";
export const checkNumberOfTestsContract = new Contract<
  typeof checkNumberOfTests
>()
  .setTitle("checks the number of tests ran against the configured number")
  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfigurationTenTests,
    getReturnValueTestData.getReturnValueTen
  )
  .thenReturn("if the numbers match, returns true", BooleanTestData.true)
  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfigurationTenTests,
    getReturnValueTestData.getReturnValueEleven
  )
  .thenThrow("if the numbers do not match, it is an error", EXPECTED_TEN_TESTS)
  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfigurationES,
    getReturnValueTestData.getReturnValue
  )
  .thenReturn(
    "if there is no number of tests defined in the config, then return true",
    BooleanTestData.true
  );
