import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorParametersSet } from "../RunDescriptor/getRunDescriptorParametersSet.js";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase.js";


export function getContractWithParametersSet(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorParametersSet();
    return contract;
}
