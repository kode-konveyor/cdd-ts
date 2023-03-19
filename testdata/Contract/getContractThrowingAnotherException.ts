import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";
import { NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN } from "./ContractTestdata.js";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException.js";


export function getContractThrowingAnotherException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].parameterGetters = getParametersThrowingException();
    contract.cases[""].runs[0].thrown = NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN;
    return contract;
}
