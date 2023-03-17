import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getCaseDescriptorWithManipulatorset } from "../CaseDescriptor/getCaseDescriptorWithManipulatorset";
import { getContractWithNonDefaultCase } from "./getContractWithNonDefaultCase";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata";


export function getContractWithManipulatorSet(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithNonDefaultCase();
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorset();
    return contract;
}
