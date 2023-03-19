import { ContractEntity } from "../../src/types/ContractEntity.js";
import { TestedFunctionType } from "../Method/TestedFunctionType.js";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase.js";
import { getReturnValueOther } from "../ReturnValue/getReturnValueOther.js";


export function getContractWithOtherReturnValue(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].returnValueGetter = getReturnValueOther();
    return contract;
}
