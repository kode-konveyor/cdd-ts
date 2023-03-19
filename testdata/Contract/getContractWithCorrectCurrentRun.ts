import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt.js";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase.js";


export function getContractWithCorrectCurrentRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorCorrectlyBuilt();
    return contract;
}
