import { Contract } from "src/contract/Contract";
import { setTitle } from "src/contract/SetTitle";
import { testedFunction } from "test/testedFunction";
import { getContractEmpty, getContractWithDescriptionSet } from "./ContractTestdata";


const setTitleFunction = (title: string) => setTitle.apply(getContractEmpty(),[title]);
const contractFunction = (title: string) => new Contract<typeof testedFunction>().setTitle.apply(getContractEmpty(),[title]);

export const SetTitleContractParties = [
    setTitleFunction,
    contractFunction]

export const SetTitleContract = new Contract<typeof setTitleFunction>()
    .setTitle("setTitle sets the title of the contract")
    .ifCalledWith("contract title")
    .thenReturn("a contract with the title set", getContractWithDescriptionSet())