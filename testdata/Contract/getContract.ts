import { Contract } from "../../src/contract/Contract.js";
import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";


export function getContract(): ContractEntity<TestedFunctionType> {
    const contract = new Contract<TestedFunctionType>();
    return contract;
}
