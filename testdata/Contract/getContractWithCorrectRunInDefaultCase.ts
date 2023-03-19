import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt.js";
import { getRunDescriptorParametersSet } from "../RunDescriptor/getRunDescriptorParametersSet.js";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase.js";


export function getContractWithCorrectRunInDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();
    contract.currentRun = getRunDescriptorParametersSet();
    contract.cases[""].runs.push(getRunDescriptorCorrectlyBuilt());
    return contract;
}
