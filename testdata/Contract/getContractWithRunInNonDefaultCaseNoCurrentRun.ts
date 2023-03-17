import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getCaseDescriptorWithCorrectRun } from "../CaseDescriptor/getCaseDescriptorWithCorrectRun";
import { getContractWithManipulatorSet } from "./getContractWithManipulatorSet";


export function getContractWithRunInNonDefaultCaseNoCurrentRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithManipulatorSet();
    contract.cases[""] = getCaseDescriptorWithCorrectRun();
    return contract;
}
