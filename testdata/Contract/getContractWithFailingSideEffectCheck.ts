import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getSideEffectCheckCaseFailing } from "../SideEffectCheckCase/getSideEffectCheckCaseFailing";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";


export function getContractWithFailingSideEffectCheck(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].sideEffectChecks.push(getSideEffectCheckCaseFailing());
    return contract;
}
