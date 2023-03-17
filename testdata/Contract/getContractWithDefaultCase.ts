import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getCaseDescriptor } from "../CaseDescriptor/getCaseDescriptor";
import { getContractWithTitle } from "./getContractWithTitle";


export function getContractWithDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithTitle();
    contract.cases[""] = getCaseDescriptor();
    return contract;
}
