import { GetStubForMixinService } from "../../src/contract/GetStubForMixinService.js";
import type { MethodType } from "../../src/types/MethodType.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { TestedFunctionTestData } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { Contract, boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";

const contractTestData = new MakeTestDataService<
  Contract<MethodType>,
  typeof ContractTestDataDescriptor
>().makeTestData(ContractTestDataDescriptor, () => new Contract());

export const getStubForMixinContractParties = [
  boundCall(GetStubForMixinService),
];

export const getStubForMixinContract = new Contract()
  .setTitle("returns a stub where the first parameter is treated as this")

  .ifCalledWith(contractTestData.getContractWithTitleAndRun)
  .thenReturn(
    "for a simple contract returns a function behaving according to the contract",
    {
      default: TestedFunctionTestData.default,
      check: ReturnValueCheckTestData.mixinStubReturnsDefinedReturnValue,
    }
  );
