import equal from "fast-deep-equal";
import { Contract } from "../src/cdd-ts.js";
import { CheckCurrentRun } from "../src/contract/CheckCurrentRun.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { MethodType } from "../src/types/MethodType.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { serialize } from "../src/util/serialize.js";
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js";
import { RUN_EXPLANATION } from "../testdata/RunDescriptorTestData.js";
import { caseNameContract } from "./caseNameContract.js";

export const checkCurrentRunContractParties = [CheckCurrentRun.prototype.checkCurrentRun.call.bind(CheckCurrentRun.prototype.checkCurrentRun)]

const contractTestData = makeTestData<ContractEntity<MethodType>,typeof ContractTestDataDescriptor> (ContractTestDataDescriptor,() => new CheckCurrentRun(caseNameContract.getStub()))

export const checkCurrentRunContract = new Contract<typeof CheckCurrentRun.prototype.checkCurrentRun.call>()
    .setTitle("checks whether the current run is okay, and pushes it to the current case")
    .ifCalledWith(contractTestData.getContract)
    .suchThat("The contract does not change",(retval,contract) => equal(contract,contractTestData.getContract())?undefined:"oops")
    .thenReturn("if there is no current run, nothing happens",() => undefined)

    .ifCalledWith(contractTestData.getContractWithCorrectCurrentRun)
    .suchThat("The contract is put to the current case",(retval,contract) => 
        (contract as ContractEntity<MethodType>).cases[""].runs[0].explanation === RUN_EXPLANATION ? undefined : serialize(contract)
    )
    .suchThat("The current run is cleared",(retval,contract) => 
        (contract as ContractEntity<MethodType>).currentRun === undefined ? undefined : "oops"
    )
    .thenReturn("if there is a correct rurrent run, puts it into the current case",() => undefined)

    .ifCalledWith(contractTestData.getContractWithFreshRun)
    .thenThrow("throws error for a run without both return and thrown value",
    "NAME OF CONTRACT:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called")

