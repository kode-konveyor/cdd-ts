import { Contract } from "../src/cdd-ts"
import { ContractEntity } from "../src/contract/ContractEntity"
import { ifCalledWith } from "../src/contract/IfCalledWith"
import { testedFunction } from "../test/testedFunction"
import { getContractEmpty, getContractWithCurrentCaseAndCurrentRun, getContractWithCurrentCaseContainingARun, getContractWithInvalidRun } from "./ContractTestdata"

function ifCalledWithFunction(
    contract: Contract<typeof testedFunction>,
    arg: number,
    arg2: string
): ContractEntity<typeof testedFunction> {
    return ifCalledWith.call(contract, arg, arg2)
}


export const IfcalledWithContractParties = [ifCalledWithFunction]

export const IfcalledWithContract = new Contract<typeof ifCalledWithFunction>()
    .setTitle("ifCalledWith sets the parameter for the run")
    .ifCalledWith(getContractEmpty(), 1, "a")
    .thenReturn("The Parameters are put into the run", getContractWithInvalidRun())
    .ifCalledWith(getContractWithInvalidRun(), 1, "a")
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown", "current run is incomplete")
    .ifCalledWith(getContractWithCurrentCaseAndCurrentRun(), 1, "a")
    .thenReturn("if there is a current case, we put the current run into the current case", getContractWithCurrentCaseContainingARun())


