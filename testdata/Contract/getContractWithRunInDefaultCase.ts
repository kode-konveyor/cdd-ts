import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getCaseDescriptorWithCorrectRun } from "../CaseDescriptor/getCaseDescriptorWithCorrectRun";
import { getContractWithFreshRun } from "./getContractWithFreshRun";


export function getContractWithRunInDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithFreshRun();
    contract.cases[""] = getCaseDescriptorWithCorrectRun();
    return contract;
}
