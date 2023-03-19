import { Contract } from "../src/contract/Contract.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { setTitle } from "../src/contract/SetTitle.js";
import { MethodType } from "../src/types/MethodType.js";
import { CONTRACT_EXPLANATION } from "../testdata/Contract/ContractTestdata.js";
import { getContractWithDefaultCase } from "../testdata/Contract/getContractWithDefaultCase.js";
import { getContract } from "../testdata/Contract/getContract.js";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType.js";


const setTitleFunction = (title: string): ContractEntity<MethodType> => setTitle.call(getContract(), title);
const contractFunction = (title: string): Contract<(arg: number, arg2: string) => string> => new Contract<TestedFunctionType>().setTitle.call(getContract() as Contract<TestedFunctionType>, title);

export const SetTitleContractParties = [
    setTitleFunction,
    contractFunction]

export const SetTitleContract = new Contract<typeof setTitleFunction>()
    .setTitle("setTitle sets the title of the contract")
    .ifCalledWith(() => CONTRACT_EXPLANATION)
    .thenReturn("a contract with the title set and an empty default case", getContractWithDefaultCase)