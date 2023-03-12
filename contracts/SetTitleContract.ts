import { Contract } from "../src/contract/Contract";
import { ContractEntity } from "../src/contract/ContractEntity";
import { setTitle } from "../src/contract/SetTitle";
import { SutType } from "../src/contract/SutType";
import { testedFunction } from "../test/testedFunction";
import { getContractEmpty, getContractWithDescriptionSet } from "./ContractTestdata";


const setTitleFunction = (title: string): ContractEntity<SutType> => setTitle.apply(getContractEmpty(),[title]);
const contractFunction = (title: string): Contract<(arg: number, arg2: string) => string> => new Contract<typeof testedFunction>().setTitle.apply(getContractEmpty(),[title]);

export const SetTitleContractParties = [
    setTitleFunction,
    contractFunction]

export const SetTitleContract = new Contract<typeof setTitleFunction>()
    .setTitle("setTitle sets the title of the contract")
    .ifCalledWith("contract title")
    .thenReturn("a contract with the title set", getContractWithDescriptionSet())