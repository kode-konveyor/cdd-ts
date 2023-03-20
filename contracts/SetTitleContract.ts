import { Contract } from "../src/contract/Contract.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { MethodType } from "../src/types/MethodType.js";
import { ContractTestDataDescriptor, CONTRACT_EXPLANATION } from "../testdata/ContractTestdata.js";
import { SetTitle } from "../src/contract/SetTitle.js";
import { TestedFunctionType } from "../testdata/MethodTestData.js";
import { makeTestData } from "../src/util/makeTestData.js";

const ContractTestData = makeTestData<ContractEntity<TestedFunctionType>>(ContractTestDataDescriptor,()=>new ContractEntity<TestedFunctionType>())

const setTitleFunction = (title: string): ContractEntity<MethodType> => SetTitle.prototype.setTitle.call(ContractTestData["getContract"](), title);
const contractFunction = (title: string): Contract<(arg: number, arg2: string) => string> => new Contract<TestedFunctionType>().setTitle.call(ContractTestData["getContract"](), title);

export const SetTitleContractParties = [
    setTitleFunction,
    contractFunction]

export const SetTitleContract = new Contract<typeof setTitleFunction>()
    .setTitle("setTitle sets the title of the contract")
    .ifCalledWith(() => CONTRACT_EXPLANATION)
    .thenReturn("a contract with the title set and an empty default case", ContractTestData["getContractWithDefaultCase"])