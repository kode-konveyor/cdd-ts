import { Contract } from "../../src/cdd-ts.js";
import { GetStubForMixin } from "../../src/contract/GetStubForMixin.js";
import { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";

const contractTestData = makeTestData<Contract<MethodType>, typeof ContractTestDataDescriptor>(
    ContractTestDataDescriptor,
    () => new Contract()
    )


export const getStubForMixinContractParties = [
    GetStubForMixin.prototype.getStubForMixin.call.bind(GetStubForMixin.prototype.getStubForMixin)
]

export const getStubForMixinContract = new Contract()
    .setTitle("returns a stub where the first parameter is treated as this")

    .ifCalledWith(contractTestData.getContractWithTitleAndRun)
    .suchThat("For the parameters defined it returns the defined return value",
        ReturnValueCheckTestData.mixinStubReturnsDefinedReturnValue)
    .thenReturn("for a simple contract returns a function behaving according to the contract", TestedFunctionTestData.default)
