import { Contract } from "../src/contract/Contract";
import { EnvironmentManipulator } from "../src/contract/EnvironmentManipulator";
import { MethodType } from "../src/contract/MethodType";
import { when } from "../src/contract/When";
import { testedFunction } from "../test/testedFunction";
import { ContractEntity } from "../src/contract/ContractEntity";
import { getContractWithCorrectCurrentRun, getContractWithDefaultCase, getContractWithManipulatorSet, getContractWithRunInNonDefaultCaseNoCurrentRun, manipulator, NONDEFAULT_CASE_NAME } from "./ContractTestdata";

const whenFunction =
    (contract: ContractEntity<typeof testedFunction>, title: string, environmentManipulator: EnvironmentManipulator): ContractEntity<MethodType> =>
        when.call(
            contract,
            title,
            environmentManipulator);
const contractFunction =
    (contract: ContractEntity<typeof testedFunction>, title: string, environmentManipulator: EnvironmentManipulator): ContractEntity<typeof testedFunction> =>
        new Contract<typeof testedFunction>().when.call(
            contract as Contract<typeof testedFunction>,
            title, environmentManipulator);

export const WhenContractParties = [
    whenFunction,
    contractFunction]

type WhenType = (arg: number, arg2: string) => string;

function newCaseChecker(
    returnValue: ContractEntity<WhenType>,
): boolean {
    return returnValue.cases[NONDEFAULT_CASE_NAME] != null;
}

function currentCaseChecker(
    returnValue: ContractEntity<WhenType>,
): boolean {
    return returnValue.currentCase === NONDEFAULT_CASE_NAME;
}

export const WhenContract: Contract<typeof whenFunction> = new Contract<typeof whenFunction>()
    .setTitle("when sets up a case with a title, using an environment manipulator")
    .ifCalledWith(getContractWithDefaultCase, ()=>NONDEFAULT_CASE_NAME, ()=>manipulator)
    .thenReturn("a contract with the title set", getContractWithManipulatorSet)
    .suchThat("a new case is created using the title", newCaseChecker)
    .suchThat( "the current case is set to the title", currentCaseChecker)
    .ifCalledWith(getContractWithCorrectCurrentRun, ()=>NONDEFAULT_CASE_NAME, ()=>manipulator)
    .thenReturn( "if there was already a run (ifCalledWith was called), it is put into the previously active case", getContractWithRunInNonDefaultCaseNoCurrentRun)

