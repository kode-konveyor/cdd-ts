import { Contract } from "../../src/contract/Contract.js"
import { TestedFunctionTestData, TestedFunctionType } from "../MethodTestData.js"


export const emptyContractParties = [ TestedFunctionTestData.default()]
export const emptyContract = new Contract<TestedFunctionType>()
    .setTitle("empty contract")