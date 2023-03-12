import { Contract } from "src/cdd-ts"
import { ContractEntity } from "src/contract/ContractEntity"
import { ifCalledWith } from "src/contract/IfCalledWith"
import { testedFunction } from "test/testedFunction"
import { getContractEmpty, getContractParametersSet, getContractWithRunWithParameter } from "./ContractTestdata"

function ifCalledWithFunction (
    contract: Contract<typeof testedFunction>,
    arg: number,
    arg2: string
): ContractEntity<typeof testedFunction> {
    return ifCalledWith.apply(contract,[arg, arg2])
}
export const IfcalledWithContractParties = [ifCalledWithFunction]

export const IfcalledWithContract = new Contract<typeof ifCalledWithFunction>()
    .setTitle("ifCalledWith sets the parameter for the run")
    .ifCalledWith(getContractParametersSet(),1,"a")
    .thenReturn("if the current run was not empty, it is put to the current case",getContractWithRunWithParameter())
    .ifCalledWith(getContractEmpty(),1,"a")
    .thenThrow("if there is a current run, and it is not fully defined, an error is thrown", "current  run is incomplete")
    .thenReturn("sets the parameters of the current run",getContractParametersSet())

