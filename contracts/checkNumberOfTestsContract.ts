import { Contract } from "../src/contract/Contract.js";
import { checkNumberOfTests } from "../src/runner/checkNumberOfTests.js";
import { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { serialize } from "../src/util/serialize.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";
import { getReturnValueTestData } from "../testdata/ReturnValueTestData.js";

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
        if(this.record[0][0].match("expected 10 tests") == null)
            throw new Error(serialize(this.record[0][0]))

    }
}

export const checkNumberOfTestsContractParties = [checkNumberOfTests]

export const checkNumberOfTestsContract = new Contract<typeof checkNumberOfTests>()
    .setTitle("checks the number of tests ran against the configured number")
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationTenTests,getReturnValueTestData.getReturnValueTen)
    .thenReturn("if the numbers match, returns true",()=>true)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationTenTests,getReturnValueTestData.getReturnValueEleven)
    .meanwhile("puts a warning to the console",new CheckConsoleErrorMessage())
    .thenReturn("if the numbers do not match, return false",()=>false)