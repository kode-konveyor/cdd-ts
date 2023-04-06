import { CheckCurrentRun } from "../../src/contract/CheckCurrentRun.js";
import { Contract } from "../../src/contract/Contract.js";
import { GetStub } from "../../src/contract/GetStub.js";
import { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckerTestData } from "../../testdata/ReturnValueCheckerTestData.js";
import { caseNameContract } from "./caseNameContract.js";

export const getStubContractParties = [GetStub.prototype.getStub.call.bind(GetStub.prototype.getStub)]

const contractTestData = makeTestData(ContractTestDataDescriptor, () => new GetStub<MethodType>(
    //    checkCurrentRunContract.getStubForMixin(),
    CheckCurrentRun.prototype.checkCurrentRun,
    caseNameContract.getStubForMixin()
))

export const getStubContract = new Contract<typeof GetStub.prototype.getStub>()
    .setTitle("returns a stub behaving according to the contract")

    .ifCalledWith(contractTestData.getContractWithTitleAndRun)
    .suchThat("For the parameters defined it returns the defined return value",
        ReturnValueCheckerTestData.stubReturnsDefinedReturnValue)
    .thenReturn("for a simple contract returns a function behaving according to the contract", TestedFunctionTestData.default)

    .ifCalledWith(contractTestData.getContractThrowingTheDefinedException)
    .suchThat("For the parameters defined to throw an exception, throw the defined exception",
        ReturnValueCheckerTestData.stubThrowsException)
    .thenReturn("for a throwing contract returns a function throwing when needed", TestedFunctionTestData.default)

    .ifCalledWith(contractTestData.getContractWithParameterConstraint)
    .suchThat("For the standing parameter check gives the return value", ReturnValueCheckerTestData.stubReturnsOne)
    .suchThat("For the failing parameter check throws exception, even if ifCalledWith set that parameter (if no another run covering it)",
        ReturnValueCheckerTestData.stubThrowsMultipleDefinedParameterException)
    .thenReturn("for a run with a parameter check, the stub gives the return value there if the parameter check stands", TestedFunctionTestData.default)
