import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getCaseDescriptorWithManipulatorsetAndRun } from "../CaseDescriptor/getCaseDescriptorWithManipulatorsetAndRun";
import { getContractWithNonDefaultCase } from "./getContractWithNonDefaultCase";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata";


export function getContractWithManipulatorSetAndRun(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCase();
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorsetAndRun();
    return contract;
}
