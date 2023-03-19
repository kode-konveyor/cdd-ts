import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getCaseDescriptorWithCorrectRun } from "../CaseDescriptor/getCaseDescriptorWithCorrectRun.js";
import { getContractWithManipulatorSet } from "./getContractWithManipulatorSet.js";


export function getContractWithRunInNonDefaultCaseNoCurrentRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithManipulatorSet();
    contract.cases[""] = getCaseDescriptorWithCorrectRun();
    return contract;
}
