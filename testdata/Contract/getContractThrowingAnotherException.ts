import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";
import { NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN } from "./ContractTestdata";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException";


export function getContractThrowingAnotherException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].parameterGetters = getParametersThrowingException();
    contract.cases[""].runs[0].thrown = NOT_THE_EXCEPTION_IDENTIFIER_WHICH_IS_THROWN;
    return contract;
}
