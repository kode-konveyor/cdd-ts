import { Contract } from "../../src/contract/Contract.js"
import { SuchThat } from "../../src/contract/SuchThat.js"
import { makeTestData } from "../../src/util/makeTestData.js"
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js"
import { LabelTestdata } from "../../testdata/LabelTestdata.js"
import { TestedFunctionType } from "../../testdata/MethodTestData.js"
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js"

const ContractTestData = makeTestData<SuchThat<TestedFunctionType>,typeof ContractTestDataDescriptor>(
    ContractTestDataDescriptor,
    ()=>new SuchThat<TestedFunctionType>())

export const SuchThatContractParties = [
    SuchThat.prototype.suchThat.call.bind(SuchThat.prototype.suchThat)
]
export const SuchThatContract = new Contract<typeof SuchThat.prototype.suchThat>()
    .setTitle("defines a return value check")
    .ifCalledWith(ContractTestData.getContractWithCorrectCurrentRun, LabelTestdata.pass, ReturnValueCheckTestData.passing)
    .thenReturn("", ContractTestData.getContractWithReturnvalueCheck)
    .ifCalledWith(ContractTestData.getContractWithTitle, LabelTestdata.pass, ReturnValueCheckTestData.passing)
    .thenThrow("","ifCalledWith is missing before suchThat")
