import { Contract, runAllContracts } from "../src/cdd-ts.js"
import { Check } from "../src/check/Check.js"
import { makeTestData } from "../src/util/makeTestData.js"
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js"
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js"
import { TestedFunctionType, TestedFunctionTestData } from "../testdata/MethodTestData.js"

const ContractTestData = makeTestData<Contract<TestedFunctionType>,typeof ContractTestDataDescriptor>(
    ContractTestDataDescriptor,
    ()=>new Contract<TestedFunctionType>())

const CheckContract =
    new Contract<typeof Check.prototype.check>()
        .setTitle("check checks whether the contract actually corresponds to the behaviour of the SUT")
        .ifCalledWith(ContractTestData.getContractWithSideEffectCheckAndThrowingRun, TestedFunctionTestData.default)
        .thenThrow("side effect checks are recommended to enter a mutex in setUp and unlock it in tearDown. TearDown will be called even if the test fails","returnvalue mismatch")

   
export const runAllContractsContractParties = [1]
export const runAllContractsContract = {
    async check() {
            const oldlog = console.log
            const logged: Array<unknown> = []
            console.log = (...params) => {logged.push(params)}
            let checkCount = await runAllContracts(CDDConfigurationTestData.runsomeContracts())
            console.log = oldlog
            if(String(logged) !== String([ [ 'number of contracts tested: ', 2 ] ]))
                throw new Error("runAllcontract did not run what was needed")
            if (checkCount !== 2)
                throw new Error("expected 2 contracts, but got "+ String(checkCount) + ".")

            try {
                await runAllContracts(CDDConfigurationTestData.runEmptyContract())
                throw new Error("empty contract did not throw")
            } catch (e) {
                if((e as Error).message.match("no checks in contract empty contract") == null) {
                    console.log(e)
                    throw new Error("empty contract did check something")
                }
            }
            try {
                await runAllContracts(CDDConfigurationTestData.emptyContractConstContract())
                throw new Error("emptyContractConstContract contract did not throw")
            } catch (e) {
                if((e as Error).message.match(" please export emptyContractConstContract from testdata/contracts/emptyContractConstContract.ts") == null) {
                    console.log(e)
                    throw new Error("emptyContractConstContract contract did check something")
                }
            }
            try {
                await runAllContracts(CDDConfigurationTestData.emptyContractPartiesContract())
                throw new Error("emptyContractConstContract contract did not throw")
            } catch (e) {
                if((e as Error).message.match("please export emptyContractPartiesContractParties from testdata/contracts/emptyContractPartiesContract.ts") == null) {
                    console.log(e)
                    throw new Error("emptyContractConstContract contract did check something")
                }
            }
            try {
                await runAllContracts(CDDConfigurationTestData.runNoContract())
                throw new Error("no contract did not throw")
            } catch (e) {
                if((e as Error).message.match("no contracts tested") == null) {
                    console.log(e)
                    throw new Error("no contract did check something")
                }
            }
            checkCount += await runAllContracts(CDDConfigurationTestData.runOneContract())

            try {
                await CheckContract.check(CheckContract.check.call.bind(CheckContract.check))
                throw new Error("check contract did not throw")
            } catch (e) {
                if((e as Error).message.match("return value mismatch") == null) {
                    console.log(e)
                    throw new Error("check contract did not throw what it should")
                }
            }
            return checkCount + 7
    }
}