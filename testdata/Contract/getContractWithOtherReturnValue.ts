import { ContractEntity } from "../../src/types/ContractEntity";
import { TestedFunctionType } from "../Method/TestedFunctionType";
import { getContractWithRunInDefaultCase } from "./getContractWithRunInDefaultCase";
import { getReturnValueOther } from "../ReturnValue/getReturnValueOther";


export function getContractWithOtherReturnValue(): ContractEntity<TestedFunctionType> {
    const contract = getContractWithRunInDefaultCase();
    contract.cases[""].runs[0].returnValueGetter = getReturnValueOther();
    return contract;
}
