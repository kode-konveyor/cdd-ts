import { testedFunction } from "test/testedFunction";
import { CheckContract } from "./CheckContract";
import {  RUN_IDENTIFICATION, anotherExceptionThrownEnvSetup, definedExceptionThrownEnvSetup, defineExceptionNotThrownEnvSetup, throwExceptionUnexpectedlyEnvSetup } from "./CheckTestData";


export function checkExceptionCheckBehaviour(contract: typeof CheckContract) {
    contract

        .when(
            "a thrown exception is defined by thenThrow with a regex for the message either with a string or a RegExp object",
            definedExceptionThrownEnvSetup
        )
        .ifCalledWith(testedFunction)
        .thenReturn("then the check expect the error message to conform to the regex", 1)

        .when(
            "an exception is not expected but thrown",
            throwExceptionUnexpectedlyEnvSetup
        )
        .ifCalledWith(testedFunction)
        .thenThrow("an 'unexpected exception' error is thrown", RUN_IDENTIFICATION + " unexpected exception:")

        .when(
            "an exception is defined in the contract but not thrown",
            defineExceptionNotThrownEnvSetup
        )
        .ifCalledWith(testedFunction)
        .thenThrow("an 'Exception expected but not thrown' error is thrown", RUN_IDENTIFICATION + " Exception expected but not thrown")

        .when(
            "another exception is thrown which is defined in the contract",
            anotherExceptionThrownEnvSetup
        )
        .ifCalledWith(testedFunction)
        .thenThrow("a 'Not the expected exception thrown' error is thrown", RUN_IDENTIFICATION + "Not the expected exception thrown. Got:Error: first arg cannot be two");
}
