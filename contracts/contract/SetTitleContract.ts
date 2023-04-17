import { Contract } from "../../src/contract/Contract.js";
import { ContractEntity } from "../../src/types/ContractEntity.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { SetTitleService } from "../../src/contract/SetTitleService.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";

const ContractTestData = makeTestData<
  ContractEntity<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new ContractEntity<TestedFunctionType>());

const contract = new Contract<TestedFunctionType>();

export const SetTitleContractParties = [
  SetTitleService.prototype.setTitle.call.bind(
    SetTitleService.prototype.setTitle
  ),
  contract.setTitle.call.bind(contract.setTitle),
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
