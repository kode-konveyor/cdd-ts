import { Contract } from "src/contract/Contract";
import { testedFunction } from "test/testedFunction";
import { getRunDescriptor } from "./RunDescriptorTestData";
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

export function getContract() {
    const checkInstance = new Contract<typeof testedFunction>()

    checkInstance.currentCase="default"
    checkInstance.explanation="The function under test"
    checkInstance.cases = {
        "": { runs: [getRunDescriptor()]},
    }
    return checkInstance
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
