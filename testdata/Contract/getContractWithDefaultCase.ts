import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getCaseDescriptor } from "../CaseDescriptor/getCaseDescriptor.js";
import { getContractWithTitle } from "./getContractWithTitle.js";


export function getContractWithDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithTitle();
    contract.cases[""] = getCaseDescriptor();
    return contract;
}
