import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";
import { getReturnValueCheckFailing } from "../ReturnValueCheck/getReturnValueCheckFailing.js";


export function getContractWithFailingReturnvalueCheck(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].returnValueChecks.push(getReturnValueCheckFailing());
    return contract;
}
