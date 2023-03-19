import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getRunDescriptorNotTriggeringSideEffect } from "../RunDescriptor/getRunDescriptorNotTriggeringSideEffect.js";
import { getContractWithGlobalSideEffectCheck } from "./getContractWithGlobalSideEffectCheck.js";


export function getContractWithGlobalSideEffectCheckNotHolding(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithGlobalSideEffectCheck();
    contract.currentRun = getRunDescriptorNotTriggeringSideEffect();
    return contract;
}
