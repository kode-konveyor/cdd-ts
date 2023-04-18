import { Contract } from "../../src/contract/Contract.js";
import { YieldService } from "../../src/contract/YieldService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { ParameterTestData } from "../../testdata/ParametersTestData.js";
import { getReturnValueTestDataIndirect } from "../../testdata/ReturnValueTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type TestedFunctionType } from "../../testdata/MethodTestData.js";

const contractTestData = new MakeTestDataService<
  Contract<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new YieldService<TestedFunctionType>() as unknown as Contract<TestedFunctionType>
);

export const YieldContractParties = [boundCall(YieldService)];

const IFCALLEDWITH_MISSING_BEFORE_YIELD =
  "ifCalledWith is missing before yield";
export const YieldContract = new Contract<
  YieldService<TestedFunctionType>["yield"]
>()
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
