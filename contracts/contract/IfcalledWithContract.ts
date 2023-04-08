import { Contract } from "../../src/contract/Contract.js"
import { ContractEntity } from "../../src/types/ContractEntity.js"
import { ParameterGetterTestData } from "../../testdata/ParametersGetterTestData.js"
import { IfCalledWith } from "../../src/contract/IfCalledWith.js"
import { TestedFunctionType } from "../../testdata/MethodTestData.js"
import { makeTestData } from "../../src/util/makeTestData.js"
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js"
import { CheckCurrentRun } from "../../src/contract/CheckCurrentRun.js"
import { caseNameContract } from "./caseNameContract.js"

const ContractTestData = makeTestData<ContractEntity<TestedFunctionType>, typeof ContractTestDataDescriptor>(
    ContractTestDataDescriptor,
    () => new IfCalledWith(
        CheckCurrentRun.prototype.checkCurrentRun,
        caseNameContract.getStubForMixin()
    ))


export const IfcalledWithContractParties = [IfCalledWith.prototype.ifCalledWith.call.bind(IfCalledWith.prototype.ifCalledWith)]
export const IfcalledWithContract = new Contract<typeof IfCalledWith.prototype.ifCalledWith>()
    .setTitle("ifCalledWith sets the parameter for the run")
    .ifCalledWith(ContractTestData.getContractWithDefaultCase, ...ParameterGetterTestData.default)
    .thenReturn("The Parameters are put into the run", ContractTestData.getContractWithParametersSet)
    .ifCalledWith(ContractTestData.getContractWithFreshRun, ...ParameterGetterTestData.default)
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown",
        "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called")
    .ifCalledWith(ContractTestData.getContractWithNonDefaultCaseAndCurrentRun, ...ParameterGetterTestData.default)
    .thenReturn("we put the current run into the current case", ContractTestData.getContractWithNonDefaultCaseWithARunStored)
    .ifCalledWith(ContractTestData.getContractWithTitleAndRun, ...ParameterGetterTestData.default)
    .thenReturn("if there was no current case, we create it", ContractTestData.getContractWithParametersInDefaultCase)
    .ifCalledWith(ContractTestData.getContractWithFreshRun)
    .thenThrow("if the previous run is not defined with at least a return value or exception, an error is signalled",
        "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called")
