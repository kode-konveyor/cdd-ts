import { Contract } from "../src/contract/Contract.js";
import { GetStub } from "../src/contract/GetStub.js";
import { MethodType } from "../src/types/MethodType.js";
import { getParametersFromGetters } from "../src/util/getParametersFromGetters.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js";
import { getMethod } from "../testdata/MethodTestData.js";
import { getParameters, getParametersThrowingException } from "../testdata/ParametersTestData.js";
import { getReturnValue } from "../testdata/ReturnValueTestData.js";
import { EXCEPTION_IDENTIFIER_ACTUALLY_THROWN } from "../testdata/RunDescriptorTestData.js";

export const getStubContractParties = [GetStub.prototype.getStub.call.bind(GetStub.prototype.getStub)]

const contractTestData = makeTestData(ContractTestDataDescriptor,() => new GetStub<MethodType>())

export const getStubContract = new Contract<typeof GetStub.prototype.getStub>()
    .setTitle("returns a stub behaving according to the contract")
    .ifCalledWith(contractTestData["getContractWithTitleAndRun"])
    .suchThat("For the parameters defined it returns the defined return value",(stub) => {
        return (stub(...getParametersFromGetters(getParameters()))=== getReturnValue())? undefined: "oops"
    })
    .thenReturn("for a simple contract returns a function behaving according to the contract", getMethod)
    .ifCalledWith(contractTestData["getContractThrowingTheDefinedException"])
    .suchThat("For the parameters defined to throw an exception, throw the defined exception", (stub) => {
        try {
            stub(...getParametersFromGetters(getParametersThrowingException()))
            return "no exception was thrown"
        } catch (catched) {
            return (String(catched).match(EXCEPTION_IDENTIFIER_ACTUALLY_THROWN) != null)?undefined:catched
        }
    })
    .thenReturn("for a throwing contract returns a function throwing when needed", getMethod)