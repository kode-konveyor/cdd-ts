import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getContract } from "./getContract";
import { CONTRACT_EXPLANATION } from "./ContractTestdata";


export function getContractWithTitle(): ContractEntity<TestedFunctionType> {
    const contract = getContract();
    contract.explanation = CONTRACT_EXPLANATION;
    return contract;
}
