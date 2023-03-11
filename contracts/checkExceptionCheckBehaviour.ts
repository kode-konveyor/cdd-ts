import { Contract } from "src/contract/Contract";
import { testedFunction } from "test/testedFunction";
import { RUN_IDENTIFICATION, getContractThrowingAnotherException, getContractNotThrowingDefinedException, getContractThrowingUnexpectedException, getContractThrowingTheDefinedException } from "./ContractTestdata";


export function checkExceptionCheckBehaviour(
    contract: Contract<(contract: Contract<typeof testedFunction>, fun: typeof testedFunction) =>number>
): void {
    contract
        .ifCalledWith(getContractThrowingTheDefinedException(),testedFunction)
        .thenReturn("if an exception is defined with thenThrow, then the check expects the error message to conform to the regex", 1)

        .ifCalledWith(getContractThrowingUnexpectedException(),testedFunction)
        .thenThrow(
            "in case if an exception which is not in the contract is thrown, an 'unexpected exception' error is thrown",
            RUN_IDENTIFICATION + " unexpected exception:")

        .ifCalledWith(getContractNotThrowingDefinedException(),testedFunction)
        .thenThrow(
            "in case an exception is defined in the contract but not thrown, an 'Exception expected but not thrown' error is thrown",
            RUN_IDENTIFICATION + " Exception expected but not thrown")

        .ifCalledWith(getContractThrowingAnotherException(),testedFunction)
        .thenThrow(
            "in case a different exception is thrown than what is in the contract, a 'Not the expected exception thrown' error is thrown",
            RUN_IDENTIFICATION + "Not the expected exception thrown. Got:Error: first arg cannot be two");
}
