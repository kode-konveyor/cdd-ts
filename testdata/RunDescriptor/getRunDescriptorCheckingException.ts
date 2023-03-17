import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity";
import { EXCEPTION_IDENTIFIER_ACTUALLY_THROWN } from "../Contract/ContractTestdata";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException";
import { getRunDescriptorWithExplanation } from "./getRunDescriptorWithExplanation";


export function getRunDescriptorCheckingException(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorWithExplanation();
    runDescriptor.parameterGetters = getParametersThrowingException();
    runDescriptor.thrown = EXCEPTION_IDENTIFIER_ACTUALLY_THROWN;
    return runDescriptor;
}
