import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getCaseDescriptorWithManipulatorset } from "../CaseDescriptor/getCaseDescriptorWithManipulatorset";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata";


export function getContractWithRunInDefaultCaseAndNonDefaultCaseWithManipulatorSet(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[NONDEFAULT_CASE_NAME] = getCaseDescriptorWithManipulatorset();
    contract.currentCase = NONDEFAULT_CASE_NAME;
    return contract;
}
