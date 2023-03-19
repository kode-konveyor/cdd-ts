import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt.js";
import { getContractWithTitle } from "./getContractWithTitle.js";


export function getContractWithTitleAndRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithTitle();
    contract.currentRun = getRunDescriptorCorrectlyBuilt();
    return contract;
}
