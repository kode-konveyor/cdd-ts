import { Contract } from "../src/contract/Contract.js";
import { EnvironmentManipulatorType } from "../src/types/EnvironmentManipulatorType.js";
import { MethodType } from "../src/types/MethodType.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { ContractTestDataDescriptor, NONDEFAULT_CASE_NAME } from "../testdata/ContractTestdata.js";
import { getEnvironmentManipulatorThrice } from "../testdata/EnvironmentManipulatorTestData.js";
import { When } from "../src/contract/When.js";
import { TestedFunctionType } from "../testdata/MethodTestData.js";
import { makeTestData } from "../src/util/makeTestData.js";

const ContractTestData = makeTestData<Contract<TestedFunctionType>>(ContractTestDataDescriptor,()=>new Contract<TestedFunctionType>())

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
): "no case added" | undefined {
    if( returnValue.cases[NONDEFAULT_CASE_NAME] != null )
        return undefined
    return "no case added"
}

function currentCaseChecker(
    returnValue: ContractEntity<WhenType>,
): "currentCase is not the expected" | undefined {
    if (returnValue.currentCase === NONDEFAULT_CASE_NAME)
        return undefined
    return "currentCase is not the expected"
}

export const WhenContract: Contract<typeof whenFunction> = new Contract<typeof whenFunction>()
    .setTitle("when sets up a case with a title, using an environment manipulator")
    .ifCalledWith(ContractTestData["getContractWithDefaultCase"], () => NONDEFAULT_CASE_NAME, getEnvironmentManipulatorThrice)
    .thenReturn("a contract with the title set", ContractTestData["getContractWithManipulatorSet"])
    .suchThat("a new case is created using the title", newCaseChecker)
    .suchThat("the current case is set to the title", currentCaseChecker)
    .ifCalledWith(ContractTestData["getContractWithCorrectCurrentRun"], () => NONDEFAULT_CASE_NAME, getEnvironmentManipulatorThrice)
    .thenReturn("if there was already a run (ifCalledWith was called), it is put into the previously active case", ContractTestData["getContractWithRunInNonDefaultCaseNoCurrentRun"])

