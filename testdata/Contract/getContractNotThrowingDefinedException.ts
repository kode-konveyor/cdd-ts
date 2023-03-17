import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";
import { NONEXISTING_EXCEPTION_IDENTIFIER } from "./ContractTestdata";


export function getContractNotThrowingDefinedException(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].thrown = NONEXISTING_EXCEPTION_IDENTIFIER;
    return contract;

}
