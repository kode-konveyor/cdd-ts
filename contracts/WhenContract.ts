import { Contract } from "../src/contract/Contract.js";
import { EnvironmentManipulatorType } from "../src/types/EnvironmentManipulatorType.js";
import { MethodType } from "../src/types/MethodType.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { NONDEFAULT_CASE_NAME } from "../testdata/Contract/ContractTestdata.js";
import { getEnvironmentManipulatorThrice } from "../testdata/EnvironmentManipulator/getEnvironmentManipulatorThrice.js";
import { getContractWithManipulatorSet } from "../testdata/Contract/getContractWithManipulatorSet.js";
import { getContractWithRunInNonDefaultCaseNoCurrentRun } from "../testdata/Contract/getContractWithRunInNonDefaultCaseNoCurrentRun.js";
import { getContractWithCorrectCurrentRun } from "../testdata/Contract/getContractWithCorrectCurrentRun.js";
import { getContractWithDefaultCase } from "../testdata/Contract/getContractWithDefaultCase.js";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType.js";
import { When } from "../src/contract/When.js";

const whenFunction =
    (contract: ContractEntity<TestedFunctionType>, title: string, environmentManipulator: EnvironmentManipulatorType): ContractEntity<MethodType> =>
        When.prototype.when.call(
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

