import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getRunDescriptorNotTriggeringSideEffect } from "../RunDescriptor/getRunDescriptorNotTriggeringSideEffect";
import { getContractWithGlobalSideEffectCheck } from "./getContractWithGlobalSideEffectCheck";


export function getContractWithGlobalSideEffectCheckNotHolding(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithGlobalSideEffectCheck();
    contract.currentRun = getRunDescriptorNotTriggeringSideEffect();
    return contract;
}
