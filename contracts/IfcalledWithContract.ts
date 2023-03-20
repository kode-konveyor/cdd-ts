import { Contract } from "../src/contract/Contract.js"
import { ContractEntity } from "../src/types/ContractEntity.js"
import { getParametersGetter } from "../testdata/ParametersGetter/getParametersGetter.js"
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType.js"
import { IfCalledWith } from "../src/contract/IfCalledWith.js"
import { ContractTestData } from "../testdata/Contract/ContractTestdata.js"

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
    .ifCalledWith(ContractTestData["getContractWithDefaultCase"], ...getParametersGetter())
    .thenReturn("The Parameters are put into the run", ContractTestData["getContractWithParametersSet"])
    .ifCalledWith(ContractTestData["getContractWithFreshRun"], ...getParametersGetter())
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown", "current run is incomplete")
    .ifCalledWith(ContractTestData["getContractWithNonDefaultCaseAndCurrentRun"], ...getParametersGetter())
    .thenReturn("we put the current run into the current case", ContractTestData["getContractWithNonDefaultCaseWithARunStored"])
    .ifCalledWith(ContractTestData["getContractWithTitleAndRun"], ...getParametersGetter())
    .thenReturn("if there was no current case, we create it", ContractTestData["getContractWithCorrectRunInDefaultCase"])
