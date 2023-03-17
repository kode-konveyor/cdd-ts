import { Contract } from "../src/contract/Contract";
import { ContractEntity } from "../src/types/ContractEntity";
import { setTitle } from "../src/contract/SetTitle";
import { MethodType } from "../src/types/MethodType";
import { CONTRACT_EXPLANATION } from "../testdata/Contract/ContractTestdata";
import { getContractWithDefaultCase } from "../testdata/Contract/getContractWithDefaultCase";
import { getContract } from "../testdata/Contract/getContract";
import { TestedFunctionType } from "../testdata/Method/TestedFunctionType";


const setTitleFunction = (title: string): ContractEntity<MethodType> => setTitle.call(getContract(), title);
const contractFunction = (title: string): Contract<(arg: number, arg2: string) => string> => new Contract<TestedFunctionType>().setTitle.call(getContract() as Contract<TestedFunctionType>, title);

export const SetTitleContractParties = [
    setTitleFunction,
    contractFunction]

export const SetTitleContract = new Contract<typeof setTitleFunction>()
    .setTitle("setTitle sets the title of the contract")
    .ifCalledWith(() => CONTRACT_EXPLANATION)
    .thenReturn("a contract with the title set and an empty default case", getContractWithDefaultCase)