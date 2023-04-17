import { Contract } from "../../src/contract/Contract.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { getReturnValueTestData } from "../../testdata/ReturnValueTestData.js";
import { BooleanTestData } from "../../testdata/BooleanTestData.js";
import { CheckNumberOfTestsService } from "../../src/runner/CheckNumberOfTestsService.js";

export const checkNumberOfTestsContractParties = [
  CheckNumberOfTestsService.prototype.checkNumberOfTests,
];

const EXPECTED_TEN_TESTS = "expected 10 tests, got 11";
export const checkNumberOfTestsContract = new Contract<
  typeof CheckNumberOfTestsService.prototype.checkNumberOfTests
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
