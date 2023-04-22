import { Contract } from "../../src/contract/Contract.js";
import { MeanWhileService } from "../../src/contract/MeanWhileService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { SideEffectCheckerTestData } from "../../testdata/SideEffectCheckerTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type DotCall } from "../../src/types/DotCall.js";
import { type IfCalledWithType } from "../../src/types/IfCalledWithType.js";

const meanWhileService = new MeanWhileService<TestedFunctionType>();

const ParameterTestData = new MakeTestDataService<
  MeanWhileService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(ContractTestDataDescriptor, () => meanWhileService);

const ReturnValueTestData = new MakeTestDataService<
  IfCalledWithType<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => meanWhileService as unknown as IfCalledWithType<TestedFunctionType>
);

export const MeanWhileContractParties = [boundCall(MeanWhileService)];
export const MeanWhileContract = new Contract<
  DotCall<
    MeanWhileService<TestedFunctionType>,
    MeanWhileService<TestedFunctionType>["meanWhile"]
  >
>()
  .setTitle("defines a side effect check")

  .ifCalledWith(
    ParameterTestData.getContractTriggeringSideEffect,
    LabelTestdata.logsToConsole,
    SideEffectCheckerTestData.default()
  )
  .thenReturn(
    "defines the side effect check",
    ReturnValueTestData.getContractTriggeringAndCheckingSideEffect
  )

  .ifCalledWith(
    ParameterTestData.getContractWithTitle,
    LabelTestdata.logsToConsole,
    SideEffectCheckerTestData.default()
  )
  .thenThrow(
    "if ifCalledWith is missing, that is an error",
    "ifCalledWith is missing before meanWhile"
  );
