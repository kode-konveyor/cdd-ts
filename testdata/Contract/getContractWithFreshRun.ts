import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorWithExplanation } from "../RunDescriptor/getRunDescriptorWithExplanation.js";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase.js";


export function getContractWithFreshRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorWithExplanation();
    return contract;
}
