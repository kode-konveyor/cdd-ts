import { Contract } from "src/contract/Contract";
import { GLobalObject } from "test/SeChecker";
import { testedFunction } from "test/testedFunction";
import { getRunDescriptor, getRunDescriptorWithDoubleReturn } from "./RunDescriptorTestData";
import { getSideEffectChecker, getSideEffectCheckerFailing } from "./SideEffectCheckerTestData";

export const EXCEPTION_THROWER_PARAMETERS:[arg: number, arg2: string] = [2, "a"];
export const NORMAL_PARAMETERS:[arg: number, arg2: string] = [1, "b"];
export const RUN_IDENTIFICATION = "The function under test::run explanation:"

export function getReturnValueCheckFailing(): [string, (returnValue: string, arg: number, arg2: string) => void] {
    return [
        "fail",
        (a, b) => {
            throw new Error("returnvalue check failure");
        }];
}

export const manipulator =  {
    setUp: () => 1,
    tearDown: () => 1
}

export function getContract() {
    const contract = new Contract<typeof testedFunction>()

    contract.explanation="The function under test"
    contract.cases = {
        "": { runs: [getRunDescriptor()]},
    }
    return contract
}

export function getContractEmpty() {
    const contract = getContract()
    contract.cases[""].runs.pop()
    return contract
}

export function getContractWithExistingRun() {
    const contract = getContractEmpty()
    contract.currentRun = getRunDescriptor();
    return contract
}

export function getContractWithManipulatorSetAndRunAdded() {
    const contract = getContractWithManipulatorSet()
    contract.cases[""].runs.push(getRunDescriptor())
    return contract
}
export function getContractWithManipulatorSet() {
    const contract = getContractEmpty()
    contract.currentCase = "when title"
    contract.cases["when title"] = {
        runs: [],
        setUp: manipulator.setUp,
        tearDown: manipulator.tearDown
    }
    return contract
}

export function getContractWithDescriptionSet() {
    const contract = getContractEmpty()
    contract.explanation = "contract title"
    return contract;
}

export function getContractWithACase() {
    const contract = getContract()
    contract.cases["Global multiplier is 3"] = {
        runs: [getRunDescriptorWithDoubleReturn()],
        setUp: () => {GLobalObject.multiplier = 3},
        tearDown: () => {GLobalObject.multiplier= 1}
    }

    return contract
}

export function getContractThrowingAnotherException() {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = EXCEPTION_THROWER_PARAMETERS
    contract.cases[""].runs[0].returnValue = "2"
    contract.cases[""].runs[0].thrown = "cannot be three"
    return contract
}

export function getContractNotThrowingDefinedException() {
    const contract = getContract()
    contract.cases[""].runs[0].thrown = "no one expects the spanish inquisition";
    return contract

}

export function getContractThrowingUnexpectedException() {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = EXCEPTION_THROWER_PARAMETERS
    return contract
}

export function getContractThrowingTheDefinedException() {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = EXCEPTION_THROWER_PARAMETERS
    contract.cases[""].runs[0].thrown = "cannot be two"
    return contract
}

export function getContractWithoutIfcalledWith() {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = undefined
    return contract
}

export function getContractWithOtherReturnValue() {
    const contract = getContract()
    contract.cases[""].runs[0].returnValue = "2"
    return contract
}

export function getContractWithFailingReturnvalueCheck() {
    const contract = getContract()
    contract.cases[""].runs[0].returnValueChecks.push(getReturnValueCheckFailing())
    return contract
}

export function getContractWithFailingSideEffectCheck() {
    const contract = getContract()
    contract.cases[""].runs[0].sideEffectChecks.push(getSideEffectCheckerFailing())
    return contract
}

export function getContractWithGlobalSideEffectCheck() {
    const contract = getContract()
    contract.cases[""].runs[0].sideEffectChecks = []
    contract.sideEffectChecks = [getSideEffectChecker()]
    return contract
}

export function getContractWithGlobalSideEffectCheckNotHolding() {
    const contract = getContractWithGlobalSideEffectCheck()
    contract.cases[""].runs[0].parameters = NORMAL_PARAMETERS
    return contract
}
