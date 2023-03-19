import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getCaseDescriptorWithManipulatorset } from "../CaseDescriptor/getCaseDescriptorWithManipulatorset.js";
import { getContractWithNonDefaultCase } from "./getContractWithNonDefaultCase.js";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata.js";


export function getContractWithManipulatorSet(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCase();
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorset();
    return contract;
}
