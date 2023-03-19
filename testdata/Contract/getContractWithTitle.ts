import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getContract } from "./getContract.js";
import { CONTRACT_EXPLANATION } from "./ContractTestdata.js";


export function getContractWithTitle(): ContractEntity<TestedFunctionType> {
    const contract = getContract();
    contract.explanation = CONTRACT_EXPLANATION;
    return contract;
}


