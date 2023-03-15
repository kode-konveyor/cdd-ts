import { Contract } from "../src/cdd-ts"
import { ContractEntity } from "../src/contract/ContractEntity"
import { ifCalledWith } from "../src/contract/IfCalledWith"
import { testedFunction } from "../test/testedFunction"
import { getContractWithNonDefaultCaseCaseAndCurrentRun, getContractWithFreshRun, getContractWithNonDefaultCaseWithARunStored, getContractWithParametersSet, getContractWithDefaultCase } from "./ContractTestdata"

type IfCalledWithFortestedFunctionType = (contract: ContractEntity<typeof testedFunction>, arg: () => number, arg2: () => string) => ContractEntity<typeof testedFunction>

function ifCalledWithFunction(
    contract: Contract<typeof testedFunction>,
    arg: () => number,
    arg2: () => string
): ContractEntity<typeof testedFunction> {
    return (ifCalledWith.call as IfCalledWithFortestedFunctionType)(contract, arg, arg2)
}

export const IfcalledWithContractParties = [ifCalledWithFunction]
export const IfcalledWithContract = new Contract<IfCalledWithFortestedFunctionType>()
    .setTitle("ifCalledWith sets the parameter for the run")
    .ifCalledWith(getContractWithDefaultCase, () => () => 1, () => () => "b")
    .thenReturn("The Parameters are put into the run", getContractWithParametersSet)
    .ifCalledWith(getContractWithFreshRun, () => () => 1, () => () => "b")
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown", "current run is incomplete")
    .ifCalledWith(getContractWithNonDefaultCaseCaseAndCurrentRun, () => () => 1, () => () => "b")
    .thenReturn("if there is a current case, we put the current run into the current case", getContractWithNonDefaultCaseWithARunStored)


