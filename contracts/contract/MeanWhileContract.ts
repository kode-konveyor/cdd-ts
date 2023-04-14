import { Contract } from "../../src/contract/Contract.js";
import { MeanWhile } from "../../src/contract/Meanwhile.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { SideEffectCheckerTestData } from "../../testdata/SideEffectCheckerTestData.js";

const ContractTestData = makeTestData<
  MeanWhile<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new MeanWhile<TestedFunctionType>());

export const MeanWhileContractParties = [
  MeanWhile.prototype.meanwhile.call.bind(MeanWhile.prototype.meanwhile),
];
const NO_IFCALLEDWITH_BEFIRE_MEANWHILE =
  "ifCalledWith is missing before meanWhile";
export const MeanWhileContract = new Contract<
  typeof MeanWhile.prototype.meanwhile
>()
  .setTitle("defines a return value check")

  .ifCalledWith(
    ContractTestData.getContractTriggeringSideEffect,
    LabelTestdata.logsToConsole,
    SideEffectCheckerTestData.default()
  )
  .thenReturn("", ContractTestData.getContractTriggeringAndCheckingSideEffect)

  .ifCalledWith(
    ContractTestData.getContractWithTitle,
    LabelTestdata.logsToConsole,
    SideEffectCheckerTestData.default()
  )
  .thenThrow(
    "if ifCalledWith is missing, that is an error",
    NO_IFCALLEDWITH_BEFIRE_MEANWHILE
  );
