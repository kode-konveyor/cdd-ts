import { Contract } from "../../src/contract/Contract.js";
import { Yield } from "../../src/contract/Yield.js";
import { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { ParameterTestData } from "../../testdata/ParametersTestData.js";
import { getReturnValueTestDataIndirect } from "../../testdata/ReturnValueTestData.js";

const contractTestData = makeTestData(
  ContractTestDataDescriptor,
  () => new Yield<MethodType>()
);

export const YieldContractParties = [
  Yield.prototype.yield.call.bind(Yield.prototype.yield),
];

export const YieldContract = new Contract<typeof Yield.prototype.yield>()
  .ifCalledWith(
    contractTestData.getContractWithFreshRun,
    ParameterTestData.default,
    getReturnValueTestDataIndirect.getReturnValue
  )
  .thenReturn(
    "puts both the parameter- and returnvaluegetter to the contract",
    contractTestData.getContractWithCorrectrunandEmptyDefaultCase
  )
  .ifCalledWith(
    contractTestData.getContract,
    ParameterTestData.default,
    getReturnValueTestDataIndirect.getReturnValue
  )
  .thenThrow("", "ifCalledWith is missing before yield");
