import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase";


export function getContractWithCorrectCurrentRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorCorrectlyBuilt();
    return contract;
}
