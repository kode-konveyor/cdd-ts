import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorCheckingException } from "../RunDescriptor/getRunDescriptorCheckingException.js";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase.js";


export function getContractThrowingTheDefinedException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorCheckingException();
    return contract;
}
