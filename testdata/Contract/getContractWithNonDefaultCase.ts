import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getContractWithDefaultCase } from "./getContractWithDefaultCase";
import { NONDEFAULT_CASE_NAME } from "./ContractTestdata";
import { getCaseDescriptor } from "../CaseDescriptor/getCaseDescriptor";


export function getContractWithNonDefaultCase(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithDefaultCase();

    contract.currentCase = NONDEFAULT_CASE_NAME;
    contract.cases[contract.currentCase] = getCaseDescriptor()

    return contract;
}
