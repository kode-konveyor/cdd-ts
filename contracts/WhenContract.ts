import { Contract } from "../src/contract/Contract";
import { EnvironmentManipulatorType } from "../src/types/EnvironmentManipulatorType";
import { MethodType } from "../src/types/MethodType";
import { when } from "../src/contract/When";
import { ContractEntity } from "../src/types/ContractEntity";
import { NONDEFAULT_CASE_NAME } from "../testdata/Contract/ContractTestdata";
import { getEnvironmentManipulatorThrice } from "../testdata/EnvironmentManipulator/getEnvironmentManipulatorThrice";
import { getContractWithManipulatorSet } from "../testdata/Contract/getContractWithManipulatorSet";
import { getContractWithRunInNonDefaultCaseNoCurrentRun } from "../testdata/Contract/getContractWithRunInNonDefaultCaseNoCurrentRun";
import { getContractWithCorrectCurrentRun } from "../testdata/Contract/getContractWithCorrectCurrentRun";
import { getContractWithDefaultCase } from "../testdata/Contract/getContractWithDefaultCase";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType";

const whenFunction =
    (contract: ContractEntity<TestedFunctionType>, title: string, environmentManipulator: EnvironmentManipulatorType): ContractEntity<MethodType> =>
        when.call(
            contract,
            title,
            environmentManipulator);
const contractFunction =
    (contract: ContractEntity<TestedFunctionType>, title: string, environmentManipulator: EnvironmentManipulatorType): ContractEntity<TestedFunctionType> =>
        new Contract<TestedFunctionType>().when.call(
            contract as Contract<TestedFunctionType>,
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
    .ifCalledWith(getContractWithDefaultCase, () => NONDEFAULT_CASE_NAME, getEnvironmentManipulatorThrice)
    .thenReturn("a contract with the title set", getContractWithManipulatorSet)
    .suchThat("a new case is created using the title", newCaseChecker)
    .suchThat("the current case is set to the title", currentCaseChecker)
    .ifCalledWith(getContractWithCorrectCurrentRun, () => NONDEFAULT_CASE_NAME, getEnvironmentManipulatorThrice)
    .thenReturn("if there was already a run (ifCalledWith was called), it is put into the previously active case", getContractWithRunInNonDefaultCaseNoCurrentRun)

