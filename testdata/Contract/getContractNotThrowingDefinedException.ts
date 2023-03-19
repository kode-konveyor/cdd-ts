import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";
import { NONEXISTING_EXCEPTION_IDENTIFIER } from "./ContractTestdata.js";


export function getContractNotThrowingDefinedException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].thrown = NONEXISTING_EXCEPTION_IDENTIFIER;
    return contract;

}
