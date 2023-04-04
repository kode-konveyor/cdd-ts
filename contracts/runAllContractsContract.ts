import { Contract, runAllContracts } from "../src/cdd-ts.js"
import { Check } from "../src/check/Check.js"
import { checkThrow, checkThrowAsync } from "../src/util/checkThrow.js"
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

            checkCount += await checkThrowAsync(
                runAllContracts,
                [CDDConfigurationTestData.runEmptyContract()],
                "no checks in contract empty contract"
            )
            checkCount += await checkThrowAsync(
                runAllContracts,
                [CDDConfigurationTestData.emptyContractConstContract()],
                " please export emptyContractConstContract from testdata/contracts/emptyContractConstContract.ts"
            )
            checkCount += await checkThrowAsync(
                runAllContracts,
                [CDDConfigurationTestData.emptyContractPartiesContract()],
                "please export emptyContractPartiesContractParties from testdata/contracts/emptyContractPartiesContract.ts"
            )
            checkCount += await checkThrowAsync(
                runAllContracts,
                [CDDConfigurationTestData.runNoContract()],
                "no contracts tested"
            )
            checkCount += await runAllContracts(CDDConfigurationTestData.runOneContract())
            checkCount += await checkThrowAsync(
                CheckContract.check.bind(CheckContract),
                [CheckContract.check.call.bind(CheckContract.check)],
                "return value mismatch"
            )

            return checkCount
    }
}