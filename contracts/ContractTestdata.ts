import { ContractEntity } from "../src/contract/ContractEntity";
import { GLobalObject } from "../test/SeChecker";
import { testedFunction } from "../test/testedFunction";
import { getCaseDescriptor, getCaseDescriptorWithCorrectRun, getCaseDescriptorWithManipulatorset, getCaseDescriptorWithManipulatorsetAndRun } from "./CaseDescriptorTestData";
import { getRunDescriptorWithExplanation, getRunDescriptorParametersSet, getRunDescriptorCorrectlyBuilt, getRunDescriptorCheckingException, getRunDescriptorNotTriggeringSideEffect } from "./RunDescriptorTestData";
import { getSideEffectCheckerFailing, getSideEffectChecker } from "./SideEffectCheckerTestData";

export const CONTRACT_EXPLANATION = "The function under test";

export const EXCEPTION_THROWER_PARAMETERS:[() => number, () => string] = [()=> 2, ()=> "a"];
export const NO_SIDE_EFFECT_PARAMETERS:[() => number, () => string] = [()=>3, ()=>"a"];
export const NORMAL_PARAMETERS:[() => number, () => string] = [()=>1, ()=>"b"];

export const RUN_IDENTIFICATION = "The function under test::run explanation:"
// export const NONDEFAULT_CASE_NAME = "Strange case";
export const NONDEFAULT_CASE_NAME = "Global multiplier is 3";
export const NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN = "cannot be three";
export const NONEXISTING_EXCEPTION_IDENTIFIER = "no one expects the spanish inquisition";
export const EXCEPTION_IDENTIFIER_ACTUALLY_THROWN = "cannot be two";
export const OTHER_RETURN_VALUE = ():string =>"2";

export function getReturnValueCheckFailing(): [string, (returnValue: string, arg: number, arg2: string) => void] {
    return [
        "fail",
        (a, b) => {
            throw new Error("returnvalue check failure");
        }];
}

export const manipulator = {
    setUp: () => { GLobalObject.multiplier = 3 },
    tearDown: () => { GLobalObject.multiplier = 1 }
}

export function getContract(): ContractEntity<typeof testedFunction> {
    const contract = new ContractEntity<typeof testedFunction>()
    return contract
}

export function getContractWithTitle(): ContractEntity<typeof testedFunction> {
    const contract = getContract()
    contract.explanation = CONTRACT_EXPLANATION
    return contract
}


export function getContractWithDefaultCase(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithTitle()
    contract.cases[""] = getCaseDescriptor()
    return contract
}

export function getContractWithFreshRun(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithDefaultCase()
    contract.currentRun = getRunDescriptorWithExplanation()
    return contract
}

export function getContractWithParametersSet(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithDefaultCase()
    contract.currentRun = getRunDescriptorParametersSet()
    return contract
}

export function getContractWithCorrectCurrentRun(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithDefaultCase()
    contract.currentRun = getRunDescriptorCorrectlyBuilt()
    return contract
}


export function getContractWithRunInDefaultCase(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithFreshRun()
    contract.cases[""] = getCaseDescriptorWithCorrectRun()
    return contract
}

export function getContractWithRunInDefaultCaseAndNonDefaultCaseWithManipulatorSet(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorset()
    contract.currentCase=NONDEFAULT_CASE_NAME
    return contract
}

export function getContractWithNonDefaultCase(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithDefaultCase()

    contract.currentCase = NONDEFAULT_CASE_NAME
    contract.cases[contract.currentCase] = { runs: [] }

    return contract
}

export function getContractWithRunInNonDefaultCaseNoCurrentRun(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithManipulatorSet()
    contract.cases[""] = getCaseDescriptorWithCorrectRun()
    return contract
}


export function getContractWithNonDefaultCaseCaseAndCurrentRun(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithNonDefaultCase()

    contract.currentRun = getRunDescriptorCorrectlyBuilt()

    return contract
}

export function getContractWithNonDefaultCaseWithARunStored(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithNonDefaultCaseCaseAndCurrentRun()

    contract.currentRun = getRunDescriptorParametersSet()
    contract.cases[NONDEFAULT_CASE_NAME].runs.push(getRunDescriptorCorrectlyBuilt())

    return contract
}

export function getContractWithManipulatorSet(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithNonDefaultCase()
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorset()
    return contract
}

export function getContractWithManipulatorSetAndRun(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithNonDefaultCase()
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorsetAndRun()
    return contract
}

export function getContractThrowingAnotherException(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[""].runs[0].parameterGetters = EXCEPTION_THROWER_PARAMETERS
    contract.cases[""].runs[0].thrown = NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN
    return contract
}

export function getContractNotThrowingDefinedException(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[""].runs[0].thrown = NONEXISTING_EXCEPTION_IDENTIFIER;
    return contract

}

export function getContractThrowingUnexpectedException(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[""].runs[0].parameterGetters = EXCEPTION_THROWER_PARAMETERS
    return contract
}

export function getContractThrowingTheDefinedException(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithDefaultCase()
    contract.currentRun = getRunDescriptorCheckingException()
    return contract
}

export function getContractWithOtherReturnValue(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[""].runs[0].returnValueGetter = OTHER_RETURN_VALUE
    return contract
}

export function getContractWithFailingReturnvalueCheck(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[""].runs[0].returnValueChecks.push(getReturnValueCheckFailing())
    return contract
}

export function getContractWithFailingSideEffectCheck(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithRunInDefaultCase()
    contract.cases[""].runs[0].sideEffectChecks.push(getSideEffectCheckerFailing())
    return contract
}

export function getContractWithGlobalSideEffectCheck(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithCorrectCurrentRun()
    contract.sideEffectChecks = [getSideEffectChecker()]
    return contract
}

export function getContractWithGlobalSideEffectCheckNotHolding(): ContractEntity<typeof testedFunction> {
    const contract = getContractWithGlobalSideEffectCheck()
    contract.currentRun = getRunDescriptorNotTriggeringSideEffect()
    return contract
}
