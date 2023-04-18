import { Contract } from "../../src/contract/Contract.js";
import { ContractEntity } from "../../src/types/ContractEntity.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { SetTitleService } from "../../src/contract/SetTitleService.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";

const ContractTestData = new MakeTestDataService<
  ContractEntity<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new ContractEntity<TestedFunctionType>()
);

const methodName = "setTitle";
export const SetTitleContractParties = [
  boundCall(SetTitleService),
  boundCall(Contract, methodName),
];

export const SetTitleContract = new Contract<
  typeof SetTitleService.prototype.setTitle
>()
  .setTitle("setTitle sets the title of the contract")
  .ifCalledWith(ContractTestData.getContract, LabelTestdata.default)
  .thenReturn(
    "a contract with the title set and an empty default case",
    ContractTestData.getContractWithDefaultCase
  );
