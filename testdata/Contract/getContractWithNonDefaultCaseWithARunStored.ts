import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt.js";
import { getRunDescriptorParametersSet } from "../RunDescriptor/getRunDescriptorParametersSet.js";
import { getContractWithNonDefaultCaseAndCurrentRun } from "./getContractWithNonDefaultCaseCaseAndCurrentRun.js";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata.js";


export function getContractWithNonDefaultCaseWithARunStored(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCaseAndCurrentRun();

    contract.currentRun = getRunDescriptorParametersSet();
    contract.cases[NONDEFAULT_CASE_NAME].runs.push(getRunDescriptorCorrectlyBuilt());

    return contract;
}
