import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";
import { getReturnValueCheckFailing } from "../ReturnValueCheck/getReturnValueCheckFailing";


export function getContractWithFailingReturnvalueCheck(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].returnValueChecks.push(getReturnValueCheckFailing());
    return contract;
}
