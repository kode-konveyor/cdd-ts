import { Contract } from "../src/contract/Contract.js"
import { ContractEntity } from "../src/types/ContractEntity.js"
import { getParametersGetter } from "../testdata/ParametersGetterTestData.js"
import { IfCalledWith } from "../src/contract/IfCalledWith.js"
import { TestedFunctionType } from "../testdata/MethodTestData.js"
import { makeTestData } from "../src/util/makeTestData.js"
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js"
import { CheckCurrentRun } from "../src/contract/CheckCurrentRun.js"
import { caseNameContract } from "./caseNameContract.js"

function getIfCalledWith(): ContractEntity<TestedFunctionType> {
    return new IfCalledWith<TestedFunctionType>(
        CheckCurrentRun.prototype.checkCurrentRun,
        caseNameContract.getStubForMixin())
}

const ContractTestData = makeTestData<ContractEntity<TestedFunctionType>>(ContractTestDataDescriptor, getIfCalledWith)

type IfCalledWithFortestedFunctionType = (contract: ContractEntity<TestedFunctionType>, arg: () => number, arg2: () => string) => ContractEntity<TestedFunctionType>


function ifCalledWithFunction(
    contract: Contract<TestedFunctionType>,
    arg: () => number,
    arg2: () => string
): ContractEntity<TestedFunctionType> {
    return new IfCalledWith<TestedFunctionType>().ifCalledWith.call(contract, arg, arg2)
}

export const IfcalledWithContractParties = [ifCalledWithFunction]
export const IfcalledWithContract = new Contract<IfCalledWithFortestedFunctionType>()
    .setTitle("ifCalledWith sets the parameter for the run")
    .ifCalledWith(ContractTestData.getContractWithDefaultCase, ...getParametersGetter())
    .thenReturn("The Parameters are put into the run", ContractTestData.getContractWithParametersSet)
    .ifCalledWith(ContractTestData.getContractWithFreshRun, ...getParametersGetter())
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown", "current run is incomplete")
    .ifCalledWith(ContractTestData.getContractWithNonDefaultCaseAndCurrentRun, ...getParametersGetter())
    .thenReturn("we put the current run into the current case", ContractTestData.getContractWithNonDefaultCaseWithARunStored)
    .ifCalledWith(ContractTestData.getContractWithTitleAndRun, ...getParametersGetter())
    .thenReturn("if there was no current case, we create it", ContractTestData.getContractWithCorrectRunInDefaultCase)
    .ifCalledWith(ContractTestData.getContractWithFreshRun)
    .thenThrow("if the previous run is not defined with at least a return value or exception, an error is signalled",
        "NAME OF CONTRACT:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called")
