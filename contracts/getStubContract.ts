import { Contract } from "../src/contract/Contract.js";
import { GetStub } from "../src/contract/GetStub.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { MethodType } from "../src/types/MethodType.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js";
import { getMethod } from "../testdata/MethodTestData.js";
import { getParameters } from "../testdata/ParametersTestData.js";
import { getReturnValue } from "../testdata/ReturnValueTestData.js";

export const getStubContractParties = [GetStub.prototype.getStub.call]

const contractTestData = makeTestData(ContractTestDataDescriptor,() => new ContractEntity<MethodType>())

export const getStubContract = new Contract<typeof GetStub.prototype.getStub>()
    .setTitle("returns a stub behaving according to the contract")
    .ifCalledWith(contractTestData.getContractWithTitleAndRunAndTestedFunction)
    .suchThat("",(stub) => {
        return (stub(getParameters())=== getReturnValue())? undefined: "oops"
    })
    .thenReturn("for a simple contract returns a function behaving according to the contract", getMethod)