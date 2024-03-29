import { Contract } from "../../src/contract/Contract.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { EnvironmentmanipulatortestData } from "../../testdata/EnvironmentManipulatorTestData.js";
import { WhenService } from "../../src/contract/WhenService.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type ContractEntity } from "../../src/types/ContractEntity.js";
import { type DotCall } from "../../src/types/DotCall.js";
import { type WhenServiceResultType } from "../../src/types/WhenServiceResultType.js";

const ParameterTestData = new MakeTestDataService<
  WhenService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new Contract<TestedFunctionType>() as unknown as WhenService<TestedFunctionType>
);

const ReturnValueTestData = new MakeTestDataService<
  WhenServiceResultType<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new Contract<TestedFunctionType>() as unknown as WhenServiceResultType<TestedFunctionType>
);

const methodName = "when";
export const WhenContractParties = [
  boundCall(WhenService),
  boundCall(Contract, methodName),
];

export const WhenContract = new Contract<
  DotCall<
    WhenService<TestedFunctionType>,
    WhenService<TestedFunctionType>["when"]
  >
>()
  .setTitle(
    "when sets up a case with a title, using an environment manipulator"
  )

  .ifCalledWith(
    ParameterTestData.getContractWithDefaultCase,
    LabelTestdata.caseName,
    EnvironmentmanipulatortestData.thrice
  )
  .thenReturn("a contract with the title set", {
    default: ReturnValueTestData.getContractWithManipulatorSet,
    check: (returnValue: WhenServiceResultType<TestedFunctionType>) => {
      return ReturnValueCheckTestData.newCaseChecker(
        returnValue as unknown as ContractEntity<TestedFunctionType>
      ) === undefined
        ? undefined
        : ReturnValueCheckTestData.currentCaseChecker;
    },
  })
  .ifCalledWith(
    ParameterTestData.getContractWithCorrectCurrentRun,
    LabelTestdata.caseName,
    EnvironmentmanipulatortestData.thrice
  )
  .thenReturn(
    "if there was already a run (ifCalledWith was called), it is put into the previously active case",
    ReturnValueTestData.getContractWithRunInNonDefaultCaseNoCurrentRun
  );
