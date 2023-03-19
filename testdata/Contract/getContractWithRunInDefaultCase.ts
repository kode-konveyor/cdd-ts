import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getCaseDescriptorWithCorrectRun } from "../CaseDescriptor/getCaseDescriptorWithCorrectRun.js";
import { getContractWithFreshRun } from "./getContractWithFreshRun.js";


export function getContractWithRunInDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithFreshRun();
    contract.cases[""] = getCaseDescriptorWithCorrectRun();
    return contract;
}
