import { Contract } from "../src/contract/Contract.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { ContractTestDataDescriptor, NONDEFAULT_CASE_NAME } from "../testdata/ContractTestdata.js";
import { EnvironmentmanipulatortestData } from "../testdata/EnvironmentManipulatorTestData.js";
import { When } from "../src/contract/When.js";
import { TestedFunctionType } from "../testdata/MethodTestData.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { LabelTestdata } from "../testdata/LabelTestdata.js";

const ContractTestData = makeTestData<Contract<TestedFunctionType>,typeof ContractTestDataDescriptor>(ContractTestDataDescriptor,()=>new Contract<TestedFunctionType>())

const contract = new Contract<TestedFunctionType>()

export const WhenContractParties = [
    When.prototype.when.call.bind(When.prototype.when),
    contract.when.call.bind(contract.when)
]


function newCaseChecker(
    returnValue: ContractEntity<typeof When.prototype.when.call>,
): "no case added" | undefined {
    if( returnValue.cases[NONDEFAULT_CASE_NAME] != null )
        return undefined
    return "no case added"
}

function currentCaseChecker(
    returnValue: ContractEntity<typeof When.prototype.when.call>,
): "currentCase is not the expected" | undefined {
    if (returnValue.currentCase === NONDEFAULT_CASE_NAME)
        return undefined
    return "currentCase is not the expected"
}

export const WhenContract = new Contract<typeof When.prototype.when>()
    .setTitle("when sets up a case with a title, using an environment manipulator")
    .ifCalledWith(ContractTestData.getContractWithDefaultCase, LabelTestdata.caseName, EnvironmentmanipulatortestData.thrice)

    .thenReturn("a contract with the title set", ContractTestData.getContractWithManipulatorSet)
    .suchThat("a new case is created using the title", newCaseChecker)
    .suchThat("the current case is set to the title", currentCaseChecker)
    
    .ifCalledWith(ContractTestData.getContractWithCorrectCurrentRun, LabelTestdata.caseName, EnvironmentmanipulatortestData.thrice)
    .thenReturn("if there was already a run (ifCalledWith was called), it is put into the previously active case", ContractTestData.getContractWithRunInNonDefaultCaseNoCurrentRun)

