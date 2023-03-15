import { EXCEPTION_IDENTIFIER_ACTUALLY_THROWN, EXCEPTION_THROWER_PARAMETERS, NORMAL_PARAMETERS, NO_SIDE_EFFECT_PARAMETERS } from "contracts/ContractTestdata";
import { testedFunction } from "test/testedFunction";
import { RunDescriptorEntity } from "../src/contract/RunDescriptorEntity";
import { getSideEffectChecker } from "./SideEffectCheckerTestData";

export const CORRECT_RETURN_VALUE = ():string =>"1";
export const SIDE_EFFECT_RETURN = ():string  =>"3";

export function getRunDescriptor(): RunDescriptorEntity<typeof testedFunction> {
    return  new RunDescriptorEntity<typeof testedFunction>();
    
}

export function getRunDescriptorWithExplanation(): RunDescriptorEntity<typeof testedFunction> {
    const runDescriptor = getRunDescriptor()
    runDescriptor.explanation= "run explanation";
    return runDescriptor
    
}

export function getRunDescriptorParametersSet(): RunDescriptorEntity<typeof testedFunction> {
    const runDescriptor = getRunDescriptor()
    runDescriptor.parameterGetters=NORMAL_PARAMETERS
    return runDescriptor
}

export function getRunDescriptorParametersAndExplanationSet(): RunDescriptorEntity<typeof testedFunction> {
    const runDescriptor = getRunDescriptorWithExplanation()
    runDescriptor.parameterGetters=NORMAL_PARAMETERS
    return runDescriptor
}

export function getRunDescriptorCorrectlyBuilt(): RunDescriptorEntity<typeof testedFunction> {
    const runDescriptor = getRunDescriptorParametersAndExplanationSet()
    runDescriptor.returnValueGetter=CORRECT_RETURN_VALUE
    return runDescriptor
}

export function getRunDescriptorNotTriggeringSideEffect(): RunDescriptorEntity<typeof testedFunction> {
    const runDescriptor = getRunDescriptorWithExplanation()
    runDescriptor.parameterGetters=NO_SIDE_EFFECT_PARAMETERS
    runDescriptor.returnValueGetter=SIDE_EFFECT_RETURN
    return runDescriptor
}

export function getRunDescriptorCheckingException(): RunDescriptorEntity<typeof testedFunction> {
    const runDescriptor = getRunDescriptorWithExplanation()
    runDescriptor.parameterGetters=EXCEPTION_THROWER_PARAMETERS
    runDescriptor.thrown=EXCEPTION_IDENTIFIER_ACTUALLY_THROWN
    return runDescriptor
}

export function getRunDescriptorwithParametersReturnAndSideeffectcheck():RunDescriptorEntity<(arg: number, arg2: string) => string> {
    const runDescriptor = getRunDescriptorParametersAndExplanationSet()
    runDescriptor.returnValueGetter= CORRECT_RETURN_VALUE;
    runDescriptor.returnValueChecks= [];
    runDescriptor.sideEffectChecks= [getSideEffectChecker()];
    return runDescriptor;
}

export function getRunDescriptorWithTripleReturn(): RunDescriptorEntity<(arg: number, arg2: string) => string> {
    const runDescriptor = getRunDescriptorwithParametersReturnAndSideeffectcheck()
    runDescriptor.explanation="triple return"
    runDescriptor.returnValueGetter=()=>"3"
    runDescriptor.sideEffectChecks.pop()
    return runDescriptor
}