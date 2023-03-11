import { Contract } from "src/contract/Contract";
import { EnvironmentManipulator } from "src/contract/EnvironmentManipulator";
import { SutType } from "src/contract/SutType";
import { when } from "src/contract/When";
import { testedFunction } from "test/testedFunction";
import { ContractEntity } from "../src/contract/ContractEntity";
import { getContractEmpty, getContractWithExistingRun, getContractWithManipulatorSet, getContractWithManipulatorSetAndRunAdded, manipulator } from "./ContractTestdata";

const whenFunction = 
    (contract: Contract<typeof testedFunction>, title: string,environmentManipulator: EnvironmentManipulator ): ContractEntity<SutType> =>
    when.apply(
        contract,
        [title,environmentManipulator]);
const contractFunction =
    (contract: Contract<typeof testedFunction>,title: string, environmentManipulator: EnvironmentManipulator): Contract<(arg: number, arg2: string) => string> =>
    new Contract<typeof testedFunction>().when.apply(
        contract,
        [title,environmentManipulator]);

export const WhenContractParties = [
    whenFunction,
    contractFunction]

type WhenType = (arg: number, arg2: string) => string;

function newCaseChecker(
    returnValue: ContractEntity<WhenType>,
):boolean {
        return returnValue.cases["when title"] != null;
}
    
function currentCaseChecker(
    returnValue: ContractEntity<WhenType>,
):boolean {
    return returnValue.currentCase === "when title";
}

export const WhenContract:Contract<typeof whenFunction> = new Contract<typeof whenFunction>()
    .setTitle("when sets up a case with a title, using an environment manipulator")
    .ifCalledWith(getContractEmpty(),"when title", manipulator)
    .thenReturn("a contract with the title set", getContractWithManipulatorSet())
    .suchThat(
        "a new case is created using the title",
        newCaseChecker)
    .suchThat(
        "the current case is set to the title",
        currentCaseChecker)
    .ifCalledWith(getContractWithExistingRun(),"when title",manipulator)
    .thenReturn(
        "if there was already a run (ifCalledWith was called), it is put into the previously active case",
        getContractWithManipulatorSetAndRunAdded())

