import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getCaseDescriptorWithManipulatorsetAndRun } from "../CaseDescriptor/getCaseDescriptorWithManipulatorsetAndRun.js";
import { getContractWithNonDefaultCase } from "./getContractWithNonDefaultCase.js";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata.js";


export function getContractWithManipulatorSetAndRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCase();
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorsetAndRun();
    return contract;
}
