import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getCaseDescriptorWithManipulatorset } from "../CaseDescriptor/getCaseDescriptorWithManipulatorset.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata.js";


export function getContractWithRunInDefaultCaseAndNonDefaultCaseWithManipulatorSet(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorset();
    contract.currentCase = NONDEFAULT_CASE_NAME;
    return contract;
}
