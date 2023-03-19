import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase.js";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata.js";
import { getCaseDescriptor } from "../CaseDescriptor/getCaseDescriptor.js";


export function getContractWithNonDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();

    contract.currentCase = NONDEFAULT_CASE_NAME;
    contract.cases[contract.currentCase] = getCaseDescriptor()

    return contract;
}
