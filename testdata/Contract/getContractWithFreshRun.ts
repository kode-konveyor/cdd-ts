import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorWithExplanation } from "../RunDescriptor/getRunDescriptorWithExplanation";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase";


export function getContractWithFreshRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorWithExplanation();
    return contract;
}
