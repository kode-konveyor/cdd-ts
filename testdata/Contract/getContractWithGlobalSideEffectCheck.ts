import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getSideEffectCheckCase } from "../SideEffectCheckCase/getSideEffectCheckCase";
import { getContractWithCorrectCurrentRun } from "./getContractWithCorrectCurrentRun";


export function getContractWithGlobalSideEffectCheck(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithCorrectCurrentRun();
    contract.sideEffectChecks = [getSideEffectCheckCase()];
    return contract;
}
