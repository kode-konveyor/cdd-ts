import { Contract } from "src/contract/Contract";
import { EnvironmentManipulator } from "src/contract/EnvironmentManipulator";
import { When } from "src/contract/When";
import { testedFunction } from "test/testedFunction";
import { getContractEmpty, getContractWithExistingRun, getContractWithManipulatorSet, getContractWithManipulatorSetAndRunAdded, manipulator } from "./ContractTestdata";


const whenFunction = (contract: Contract<typeof testedFunction>, title: string,environmentManipulator: EnvironmentManipulator, ) => new When<typeof testedFunction>().when.apply(
    contract,
    [title,environmentManipulator]);
const contractFunction = (contract: Contract<typeof testedFunction>,title: string, environmentManipulator: EnvironmentManipulator) => new Contract<typeof testedFunction>().when.apply(
    contract,
    [title,environmentManipulator]);

export const WhenContractParties = [
    whenFunction,
    contractFunction]

export const WhenContract = new Contract<typeof whenFunction>()
    .setTitle("when sets up a case with a title, using an environment manipulator")
    .ifCalledWith(getContractEmpty(),"when title", manipulator)
    .thenReturn("a contract with the title set", getContractWithManipulatorSet())
    .suchThat(
        "a new case is created using the title",
        (returnValue: When<(arg: number, arg2: string) => string>, contract: Contract<typeof testedFunction>,  title: string, environmentManipulator: EnvironmentManipulator) => 
            returnValue.cases["when title"] != null)
    .suchThat(
        "the current case is set to the title",
        (returnValue: When<(arg: number, arg2: string) => string>, contract: Contract<typeof testedFunction>, title: string, environmentManipulator: EnvironmentManipulator) => 
            returnValue.currentCase == "when title")
    .ifCalledWith(getContractWithExistingRun(),"when title",manipulator)
    .thenReturn("if there was already a run (ifCalledWith was called), it is put into the previously active case", getContractWithManipulatorSetAndRunAdded())
