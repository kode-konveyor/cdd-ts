import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";


export function getContract(): ContractEntity<TestedFunctionType> {
    const contract = new ContractEntity<TestedFunctionType>();
    return contract;
}
