import { Contract } from "../src/contract/Contract.js";
import { checkNumberOfTests } from "../src/runner/checkNumberOfTests.js";
import { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { serialize } from "../src/util/serialize.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";
import { getReturnValueTestData } from "../testdata/ReturnValueTestData.js";
import { BooleanTestData } from "../testdata/BooleanTestData.js";

class CheckConsoleErrorMessage implements SideEffectCheckerType {
    oldlog!: typeof console.log
    record: Array<Array<string>> = []

    setUp():void {
        this.oldlog = console.log
        console.log = (...params) => { this.record.push(params)}
    }

    tearDown():void {
        console.log = this.oldlog
    }

    check():void {
        // @ts-expect-error
        const writtenToStdout:string = this.record[0][0];
        if(writtenToStdout.match("expected 10 tests") == null)
            throw new Error(serialize(writtenToStdout))

    }
}

export const checkNumberOfTestsContractParties = [checkNumberOfTests]

export const checkNumberOfTestsContract = new Contract<typeof checkNumberOfTests>()
    .setTitle("checks the number of tests ran against the configured number")
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationTenTests,getReturnValueTestData.getReturnValueTen)
    .thenReturn("if the numbers match, returns true",BooleanTestData.true)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationTenTests,getReturnValueTestData.getReturnValueEleven)
    .meanwhile("puts a warning to the console",new CheckConsoleErrorMessage())
    .thenReturn("if the numbers do not match, return false",BooleanTestData.false)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationES,getReturnValueTestData.getReturnValue)
    .thenReturn("if there is no number of tests defined in the config, then return true", BooleanTestData.true)