import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getSideEffectCheckCaseFailing } from "../SideEffectCheckCase/getSideEffectCheckCaseFailing.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";


export function getContractWithFailingSideEffectCheck(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].sideEffectChecks.push(getSideEffectCheckCaseFailing());
    return contract;
}
