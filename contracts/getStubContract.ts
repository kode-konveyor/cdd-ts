import { CheckCurrentRun } from "../src/contract/CheckCurrentRun.js";
import { Contract } from "../src/contract/Contract.js";
import { GetStub } from "../src/contract/GetStub.js";
import { MethodType } from "../src/types/MethodType.js";
import { getParametersFromGetters } from "../src/util/getParametersFromGetters.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../testdata/ContractTestdata.js";
import { TestedFunctionTestData } from "../testdata/MethodTestData.js";
import { ParameterTestData } from "../testdata/ParametersTestData.js";
import { getReturnValueTestData } from "../testdata/ReturnValueTestData.js";
import { EXCEPTION_IDENTIFIER_ACTUALLY_THROWN } from "../testdata/RunDescriptorTestData.js";
import { caseNameContract } from "./caseNameContract.js";

export const getStubContractParties = [GetStub.prototype.getStub.call.bind(GetStub.prototype.getStub)]

const contractTestData = makeTestData(ContractTestDataDescriptor,() => new GetStub<MethodType>(
//    checkCurrentRunContract.getStubForMixin(),
    CheckCurrentRun.prototype.checkCurrentRun,
    caseNameContract.getStubForMixin()
))

export const getStubContract = new Contract<typeof GetStub.prototype.getStub>()
    .setTitle("returns a stub behaving according to the contract")

    .ifCalledWith(contractTestData.getContractWithTitleAndRun)
    .suchThat("For the parameters defined it returns the defined return value",(stub) => {
        return (stub(...getParametersFromGetters(ParameterTestData.default()))=== getReturnValueTestData.getReturnValue())? undefined: "oops"
    })
    .thenReturn("for a simple contract returns a function behaving according to the contract", TestedFunctionTestData.default)

    .ifCalledWith(contractTestData.getContractThrowingTheDefinedException)
    .suchThat("For the parameters defined to throw an exception, throw the defined exception", (stub) => {
        try {
            stub(...getParametersFromGetters(ParameterTestData.exceptionThrowing()))
            return "no exception was thrown"
        } catch (catched) {
            return (String(catched).match(EXCEPTION_IDENTIFIER_ACTUALLY_THROWN) != null)?undefined:catched
        }
    })
    .thenReturn("for a throwing contract returns a function throwing when needed", TestedFunctionTestData.default)

    .ifCalledWith(contractTestData.getContractWithParameterConstraint)
    .suchThat("For the standing parameter check gives the return value", (stub) => {
        const ret = stub(...getParametersFromGetters(ParameterTestData.default()));
        return ret  === "3" ?undefined:ret
    })
    .suchThat("For the failing parameter check throws exception, even if ifCalledWith set that parameter (if no another run covering it)", (stub) => {
        try {
            stub(...getParametersFromGetters(ParameterTestData.withoutSideEffects()));
            return "no exception thrown"
        } catch (catched) {
            return (String(catched).match("those parameters are not defined exactly once for this case") != null)?undefined:catched
        }
    })
    .thenReturn("for a run with a parameter check, the stub gives the return value there if the parameter check stands", TestedFunctionTestData.default)