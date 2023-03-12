import { check } from "src/check/Check"
import { Contract } from "src/contract/Contract"
import { testedFunction } from "test/testedFunction"
import { checkExceptionCheckBehaviour } from "./checkExceptionCheckBehaviour"
import { checkSideEffectBehaviour } from "./checkSideEffectBehaviour"
import { RUN_IDENTIFICATION, getContract, getContractWithoutIfcalledWith, getContractWithOtherReturnValue, getContractWithFailingReturnvalueCheck, getContractWithACase } from "./ContractTestdata"


export const CheckContractParties = [
    (contract: Contract<typeof testedFunction>,fun: typeof testedFunction) => check.apply(contract,[fun]),
    (contract: Contract<typeof testedFunction>,fun: typeof testedFunction) => new Contract().check.apply(contract,[fun]),
    
]


export const CheckContract = 
    new Contract<(contract: Contract<typeof testedFunction>,fun: typeof testedFunction) =>number>()
    .setTitle("check checks whether the contract actually corresponds to the behaviour of the SUT")

    .ifCalledWith(getContract(),testedFunction)
    .thenReturn("it returns the number of runs checked in the contract",1)

    .ifCalledWith(getContractWithoutIfcalledWith(),testedFunction)
    .thenThrow("if there is no ifCalledWith, a 'no ifCalledWith' error is thrown",RUN_IDENTIFICATION+" no ifcalledWith")

 

    .ifCalledWith(getContractWithOtherReturnValue(),testedFunction)
    .thenThrow("if the return value is not according to the contract a 'return value mismatch' error is thrown",RegExp(RUN_IDENTIFICATION+" return value mismatch:.*expected:.2.*actual  :.1","ms"))
 
    .ifCalledWith(getContractWithFailingReturnvalueCheck(),testedFunction)
    .thenThrow("if a return value check fails, a 'return value check did not hold' error is thrown",RUN_IDENTIFICATION+" fail: return value check did not hold")
 
    .ifCalledWith(getContractWithACase(),testedFunction)
    .thenReturn("with a 'when' we can use an environment manipulator to set up the environment",2)

    checkSideEffectBehaviour(CheckContract)
    checkExceptionCheckBehaviour(CheckContract)