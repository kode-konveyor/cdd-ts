import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt";
import { getContractWithNonDefaultCase } from "./getContractWithNonDefaultCase";


export function getContractWithNonDefaultCaseCaseAndCurrentRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCase();

    contract.currentRun = getRunDescriptorCorrectlyBuilt();

    return contract;
}
