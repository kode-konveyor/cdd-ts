import { Contract } from "../src/contract/Contract";
import { ContractEntity } from "../src/contract/ContractEntity";
import { setTitle } from "../src/contract/SetTitle";
import { MethodType } from "../src/contract/MethodType";
import { testedFunction } from "../test/testedFunction";
import { CONTRACT_EXPLANATION, getContract, getContractWithDefaultCase } from "./ContractTestdata";


const setTitleFunction = (title: string): ContractEntity<MethodType> => setTitle.call(getContract(), title);
const contractFunction = (title: string): Contract<(arg: number, arg2: string) => string> => new Contract<typeof testedFunction>().setTitle.call(getContract() as Contract<typeof testedFunction>, title);

export const SetTitleContractParties = [
    setTitleFunction,
    contractFunction]

export const SetTitleContract = new Contract<typeof setTitleFunction>()
    .setTitle("setTitle sets the title of the contract")
    .ifCalledWith(()=>CONTRACT_EXPLANATION)
    .thenReturn("a contract with the title set and an empty default case", getContractWithDefaultCase)