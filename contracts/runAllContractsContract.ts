import { runAllContracts } from "../src/cdd-ts.js"
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js"


export const runAllContractsContractParties = [1]
export const runAllContractsContract = {
    async check() {
            const foo = await runAllContracts(CDDConfigurationTestData.runsomeContracts())
            if (foo !== 2)
                throw new Error("expected 2 contracts, but got "+ String(foo) + ".")
            return foo
    }
}