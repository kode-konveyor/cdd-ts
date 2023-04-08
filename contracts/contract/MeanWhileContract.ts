import { Contract } from "../../src/contract/Contract.js"
import { MeanWhile } from "../../src/contract/Meanwhile.js"
import { makeTestData } from "../../src/util/makeTestData.js"
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js"
import { LabelTestdata } from "../../testdata/LabelTestdata.js"
import { TestedFunctionType } from "../../testdata/MethodTestData.js"
import { SideEffectCheckerTestData } from "../../testdata/SideEffectCheckerTestData.js"

const ContractTestData = makeTestData<MeanWhile<TestedFunctionType>,typeof ContractTestDataDescriptor>(
    ContractTestDataDescriptor,
    ()=>new MeanWhile<TestedFunctionType>())

export const MeanWhileContractParties = [
    MeanWhile.prototype.meanwhile.call.bind(MeanWhile.prototype.meanwhile)
]
export const MeanWhileContract = new Contract<typeof MeanWhile.prototype.meanwhile>()
    .setTitle("defines a return value check")

    .ifCalledWith(ContractTestData.getContractTriggeringSideEffect, LabelTestdata.logsToConsole, SideEffectCheckerTestData.default())
    .thenReturn("", ContractTestData.getContractTriggeringAndCheckingSideEffect)

    .ifCalledWith(ContractTestData.getContractWithTitle, LabelTestdata.logsToConsole, SideEffectCheckerTestData.default())
    .thenThrow("","ifCalledWith is missing before meanWhile")
