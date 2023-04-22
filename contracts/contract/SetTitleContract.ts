import { Contract } from "../../src/contract/Contract.js";
import { ContractEntity } from "../../src/types/ContractEntity.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { SetTitleService } from "../../src/contract/SetTitleService.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type DotCall } from "../../src/types/DotCall.js";
import { type IfCalledWithType } from "../../src/types/IfCalledWithType.js";

const ParameterTestData = new MakeTestDataService<
  SetTitleService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new ContractEntity<TestedFunctionType>() as SetTitleService<TestedFunctionType>
);

const ReturntestData = new MakeTestDataService<
  IfCalledWithType<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new ContractEntity<TestedFunctionType>() as unknown as IfCalledWithType<TestedFunctionType>
);

const methodName = "setTitle";
export const SetTitleContractParties = [
  boundCall(SetTitleService),
  boundCall(Contract, methodName),
];

export const SetTitleContract = new Contract<
  DotCall<
    SetTitleService<TestedFunctionType>,
    SetTitleService<TestedFunctionType>["setTitle"]
  >
>()
  .setTitle("setTitle sets the title of the contract")
  .ifCalledWith(ParameterTestData.getContract, LabelTestdata.default)
  .thenReturn(
    "a contract with the title set and an empty default case",
    ReturntestData.getContractWithDefaultCase
  );
