import { Contract } from "../src/cdd-ts.js";
import { CaseName } from "../src/check/CaseName.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { MethodType } from "../src/types/MethodType.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js";
import { TestedFunctionType } from "../testdata/MethodTestData.js";


const ContractTestData = makeTestData<ContractEntity<TestedFunctionType>>(ContractTestDataDescriptor,()=>new ContractEntity<TestedFunctionType>())


export const caseNameContractParties = [(contract:ContractEntity<MethodType>) => CaseName.prototype.caseName.call(contract)]
export const caseNameContract = new Contract<CaseName<MethodType>["caseName"]>()
    .setTitle("returns the name of the currently checked case")
    .ifCalledWith(ContractTestData["getContractWithNonDefaultCaseAndCurrentRunInCheck"])
    .thenReturn("contains the name of the contract, the current case, and the current run",()=>"The function under test:Global multiplier is 3:run explanation")
    .ifCalledWith(ContractTestData["getContract"])
    .thenReturn("For each undefined things uses 'undefined'",()=>"undefined:undefined:undefined")
    .ifCalledWith(ContractTestData["getContractWithFreshRun"])
    .suchThat("we have no constraints on input", () => undefined)
    .thenReturn("a contract with fresh run",
        ()=>"The function under test:undefined:undefined")