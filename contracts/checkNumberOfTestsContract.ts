import { Contract } from "../src/contract/Contract.js";
import { checkNumberOfTests } from "../src/runner/checkNumberOfTests.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";
import { getReturnValueTestData } from "../testdata/ReturnValueTestData.js";
import { BooleanTestData } from "../testdata/BooleanTestData.js";
import { ConsoleLogChecker } from "../src/util/ConsoleLogChecker.js";

export const checkNumberOfTestsContractParties = [checkNumberOfTests]

export const checkNumberOfTestsContract = new Contract<typeof checkNumberOfTests>()
    .setTitle("checks the number of tests ran against the configured number")
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationTenTests,getReturnValueTestData.getReturnValueTen)
    .thenReturn("if the numbers match, returns true",BooleanTestData.true)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationTenTests,getReturnValueTestData.getReturnValueEleven)
    .meanwhile("puts a warning to the console",new ConsoleLogChecker("expected 10 tests"))
    .thenReturn("if the numbers do not match, return false",BooleanTestData.false)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationES,getReturnValueTestData.getReturnValue)
    .thenReturn("if there is no number of tests defined in the config, then return true", BooleanTestData.true)