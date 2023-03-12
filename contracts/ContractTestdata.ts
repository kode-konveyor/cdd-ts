import { Contract } from "../src/contract/Contract";
import { GLobalObject } from "../test/SeChecker";
import { testedFunction } from "../test/testedFunction";
import { getRunDescriptorwithParametersReturnAndSideeffectcheck, getRunDescriptorWithDoubleReturn, getRunDescriptorParametersSet } from "./RunDescriptorTestData";
import { getSideEffectChecker, getSideEffectCheckerFailing } from "./SideEffectCheckerTestData";

export const EXCEPTION_THROWER_PARAMETERS: [arg: number, arg2: string] = [2, "a"];
export const NORMAL_PARAMETERS: [arg: number, arg2: string] = [1, "b"];
export const RUN_IDENTIFICATION = "The function under test::run explanation:"

export function getReturnValueCheckFailing(): [string, (returnValue: string, arg: number, arg2: string) => void] {
    return [
        "fail",
        (a, b) => {
            throw new Error("returnvalue check failure");
        }];
}

export const manipulator = {
    setUp: () => 1,
    tearDown: () => 1
}

export function getContract(): Contract<(arg: number, arg2: string) => string> {
    const contract = new Contract<typeof testedFunction>()

    contract.explanation = "The function under test"
    contract.cases = {
        "": { runs: [getRunDescriptorwithParametersReturnAndSideeffectcheck()] },
    }
    return contract
}

const NONDEFAULT_CASE_NAME = "Strange case";
export function getContractWithCurrentCase(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractEmpty()

    contract.currentCase = NONDEFAULT_CASE_NAME
    contract.cases[contract.currentCase] = { runs: [] }

    return contract
}

export function getContractWithCurrentCaseContainingARun(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractWithCurrentCase()

    contract.cases[NONDEFAULT_CASE_NAME].runs.push(getRunDescriptorwithParametersReturnAndSideeffectcheck())
    contract.currentRun = getRunDescriptorParametersSet()
    return contract
}


export function getContractWithCurrentCaseAndCurrentRun(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractWithCurrentCase()

    contract.currentRun = getRunDescriptorwithParametersReturnAndSideeffectcheck()

    return contract
}

export function getContractEmpty(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs.pop()
    return contract
}

export function getContractWithInvalidRun(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractEmpty()
    contract.currentRun = getRunDescriptorParametersSet()
    return contract

}

export function getContractWithRunWithParameter(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractWithInvalidRun()
    contract.cases[""].runs.push(getRunDescriptorParametersSet())
    return contract
}

export function getContractWithExistingRun(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractEmpty()
    contract.currentRun = getRunDescriptorwithParametersReturnAndSideeffectcheck();
    return contract
}

export function getContractWithManipulatorSetAndRunAdded(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractWithManipulatorSet()
    contract.cases[""].runs.push(getRunDescriptorwithParametersReturnAndSideeffectcheck())
    return contract
}
export function getContractWithManipulatorSet(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractEmpty()
    contract.currentCase = "when title"
    contract.cases["when title"] = {
        runs: [],
        setUp: manipulator.setUp,
        tearDown: manipulator.tearDown
    }
    return contract
}

export function getContractWithDescriptionSet(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractEmpty()
    contract.explanation = "contract title"
    return contract;
}

export function getContractWithACase(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases["Global multiplier is 3"] = {
        runs: [getRunDescriptorWithDoubleReturn()],
        setUp: () => { GLobalObject.multiplier = 3 },
        tearDown: () => { GLobalObject.multiplier = 1 }
    }

    return contract
}

export function getContractThrowingAnotherException(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = EXCEPTION_THROWER_PARAMETERS
    contract.cases[""].runs[0].returnValue = "2"
    contract.cases[""].runs[0].thrown = "cannot be three"
    return contract
}

export function getContractNotThrowingDefinedException(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].thrown = "no one expects the spanish inquisition";
    return contract

}

export function getContractThrowingUnexpectedException(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = EXCEPTION_THROWER_PARAMETERS
    return contract
}

export function getContractThrowingTheDefinedException(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = EXCEPTION_THROWER_PARAMETERS
    contract.cases[""].runs[0].thrown = "cannot be two"
    return contract
}

export function getContractWithoutIfcalledWith(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].parameters = undefined
    return contract
}

export function getContractWithOtherReturnValue(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].returnValue = "2"
    return contract
}

export function getContractWithFailingReturnvalueCheck(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].returnValueChecks.push(getReturnValueCheckFailing())
    return contract
}

export function getContractWithFailingSideEffectCheck(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].sideEffectChecks.push(getSideEffectCheckerFailing())
    return contract
}

export function getContractWithGlobalSideEffectCheck(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContract()
    contract.cases[""].runs[0].sideEffectChecks = []
    contract.sideEffectChecks = [getSideEffectChecker()]
    return contract
}

export function getContractWithGlobalSideEffectCheckNotHolding(): Contract<(arg: number, arg2: string) => string> {
    const contract = getContractWithGlobalSideEffectCheck()
    contract.cases[""].runs[0].parameters = NORMAL_PARAMETERS
    return contract
}
