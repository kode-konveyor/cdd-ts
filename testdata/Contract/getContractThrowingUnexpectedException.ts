import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";


export function getContractThrowingUnexpectedException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].parameterGetters = getParametersThrowingException();
    return contract;
}
