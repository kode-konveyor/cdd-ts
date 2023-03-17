import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorParametersSet } from "../RunDescriptor/getRunDescriptorParametersSet";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase";


export function getContractWithParametersSet(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorParametersSet();
    return contract;
}
