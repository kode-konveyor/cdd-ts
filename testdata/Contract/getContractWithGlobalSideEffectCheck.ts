import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getSideEffectCheckCase } from "../SideEffectCheckCase/getSideEffectCheckCase.js";
import { getContractWithCorrectCurrentRun } from "./getContractWithCorrectCurrentRun.js";


export function getContractWithGlobalSideEffectCheck(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithCorrectCurrentRun();
    contract.sideEffectChecks = [getSideEffectCheckCase()];
    return contract;
}
