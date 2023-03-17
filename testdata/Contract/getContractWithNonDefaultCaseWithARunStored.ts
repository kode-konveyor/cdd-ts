import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorCorrectlyBuilt } from "../RunDescriptor/getRunDescriptorCorrectlyBuilt";
import { getRunDescriptorParametersSet } from "../RunDescriptor/getRunDescriptorParametersSet";
import { getContractWithNonDefaultCaseCaseAndCurrentRun } from "./getContractWithNonDefaultCaseCaseAndCurrentRun";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata";


export function getContractWithNonDefaultCaseWithARunStored(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCaseCaseAndCurrentRun();

    contract.currentRun = getRunDescriptorParametersSet();
    contract.cases[NONDEFAULT_CASE_NAME].runs.push(getRunDescriptorCorrectlyBuilt());

    return contract;
}
