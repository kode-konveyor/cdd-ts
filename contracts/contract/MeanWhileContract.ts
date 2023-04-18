import { Contract } from "../../src/contract/Contract.js";
import { MeanWhileService } from "../../src/contract/MeanWhileService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { SideEffectCheckerTestData } from "../../testdata/SideEffectCheckerTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";

const ContractTestData = new MakeTestDataService<
  MeanWhileService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new MeanWhileService<TestedFunctionType>()
);

export const MeanWhileContractParties = [boundCall(MeanWhileService)];
const NO_IFCALLEDWITH_BEFIRE_MEANWHILE =
  "ifCalledWith is missing before meanWhile";
export const MeanWhileContract = new Contract<
  typeof MeanWhileService.prototype.meanWhile
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
