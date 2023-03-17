import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getParametersThrowingException } from "../Parameters/getParametersThrowingException";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";


export function getContractThrowingUnexpectedException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].parameterGetters = getParametersThrowingException();
    return contract;
}
