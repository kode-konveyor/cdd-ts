import { RunDescriptorEntity } from "../../src/types/RunDescriptorEntity.js";
import { EXCEPTION_IDENTIFIER_ACTUALLY_THROWN } from "../Contract/ContractTestdata.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException.js";
import { getRunDescriptorWithExplanation } from "./getRunDescriptorWithExplanation.js";


export function getRunDescriptorCheckingException(): RunDescriptorEntity<TestedFunctionType> {
    const runDescriptor = getRunDescriptorWithExplanation();
    runDescriptor.parameterGetters = getParametersThrowingException();
    runDescriptor.thrown = EXCEPTION_IDENTIFIER_ACTUALLY_THROWN;
    return runDescriptor;
}
