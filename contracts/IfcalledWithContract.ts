import { Contract } from "../src/contract/Contract.js"
import { ContractEntity } from "../src/types/ContractEntity.js"
import { getContractWithNonDefaultCaseWithARunStored } from "../testdata/Contract/getContractWithNonDefaultCaseWithARunStored.js"
import { getContractWithNonDefaultCaseAndCurrentRun } from "../testdata/Contract/getContractWithNonDefaultCaseCaseAndCurrentRun.js"
import { getContractWithParametersSet } from "../testdata/Contract/getContractWithParametersSet.js"
import { getContractWithFreshRun } from "../testdata/Contract/getContractWithFreshRun.js"
import { getContractWithDefaultCase } from "../testdata/Contract/getContractWithDefaultCase.js"
import { getParametersGetter } from "../testdata/ParametersGetter/getParametersGetter.js"
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType.js"
import { getContractWithTitleAndRun } from "../testdata/Contract/getContractWithTitleAndRun.js"
import { getContractWithCorrectRunInDefaultCase } from "../testdata/Contract/getContractWithCorrectRunInDefaultCase.js"
import { IfCalledWith } from "../src/contract/IfCalledWith.js"

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
    .ifCalledWith(getContractWithDefaultCase, ...getParametersGetter())
    .thenReturn("The Parameters are put into the run", getContractWithParametersSet)
    .ifCalledWith(getContractWithFreshRun, ...getParametersGetter())
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown", "current run is incomplete")
    .ifCalledWith(getContractWithNonDefaultCaseAndCurrentRun, ...getParametersGetter())
    .thenReturn("we put the current run into the current case", getContractWithNonDefaultCaseWithARunStored)
    .ifCalledWith(getContractWithTitleAndRun, ...getParametersGetter())
    .thenReturn("if there was no current case, we create it", getContractWithCorrectRunInDefaultCase)
