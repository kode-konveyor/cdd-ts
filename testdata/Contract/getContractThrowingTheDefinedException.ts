import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorCheckingException } from "../RunDescriptor/getRunDescriptorCheckingException";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase";


export function getContractThrowingTheDefinedException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorCheckingException();
    return contract;
}
