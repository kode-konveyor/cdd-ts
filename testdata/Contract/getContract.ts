import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";


export function getContract(): ContractEntity<TestedFunctionType> {
    const contract = new ContractEntity<TestedFunctionType>();
    return contract;
}
