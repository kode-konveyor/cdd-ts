import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt.js";
import { getContractWithNonDefaultCase } from "./getContractWithNonDefaultCase.js";


export function getContractWithNonDefaultCaseCaseAndCurrentRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCase();

    contract.currentRun = getRunDescriptorCorrectlyBuilt();

    return contract;
}
