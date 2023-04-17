import { Contract } from "../../src/contract/Contract.js";
import { YieldService } from "../../src/contract/YieldService.js";
import type { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { ParameterTestData } from "../../testdata/ParametersTestData.js";
import { getReturnValueTestDataIndirect } from "../../testdata/ReturnValueTestData.js";

const contractTestData = makeTestData(
  ContractTestDataDescriptor,
  () => new YieldService<MethodType>()
);

export const YieldContractParties = [
  YieldService.prototype.yield.call.bind(YieldService.prototype.yield),
];

const IFCALLEDWITH_MISSING_BEFORE_YIELD =
  "ifCalledWith is missing before yield";
export const YieldContract = new Contract<typeof YieldService.prototype.yield>()
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
  .thenThrow(
    "if no ifCalledWith was called, it is an error",
    IFCALLEDWITH_MISSING_BEFORE_YIELD
  );
