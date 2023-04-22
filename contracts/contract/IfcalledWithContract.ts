import { Contract } from "../../src/contract/Contract.js";
import { ParameterGetterTestData } from "../../testdata/ParametersGetterTestData.js";
import { IfCalledWithService } from "../../src/contract/IfCalledWithService.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { CheckCurrentRunService } from "../../src/contract/CheckCurrentRunService.js";
import { caseNameContract } from "./caseNameContract.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { type DotCall } from "./DotCall.js";
import { type ThenReturnOrThenThrowType } from "../../src/types/ThenReturnOrThenThrowType.js";

const ParameterTestdata = new MakeTestDataService<
  IfCalledWithService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new IfCalledWithService(
      CheckCurrentRunService.prototype.checkCurrentRun,
      caseNameContract.getStubForMixin()
    )
);

const ReturnValueTestData = new MakeTestDataService<
  ThenReturnOrThenThrowType<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new IfCalledWithService(
      CheckCurrentRunService.prototype.checkCurrentRun,
      caseNameContract.getStubForMixin()
    ) as unknown as ThenReturnOrThenThrowType<TestedFunctionType>
);

export const IfcalledWithContractParties = [boundCall(IfCalledWithService)];
export const IfcalledWithContract = new Contract<
  DotCall<
    IfCalledWithService<TestedFunctionType>,
    IfCalledWithService<TestedFunctionType>["ifCalledWith"]
  >
>()
  .setTitle("ifCalledWith sets the parameter for the run")
  .ifCalledWith(
    ParameterTestdata.getContractWithDefaultCase,
    ...ParameterGetterTestData.default
  )
  .thenReturn(
    "The Parameters are put into the run",
    ReturnValueTestData.getContractWithParametersSet
  )

  .ifCalledWith(
    ParameterTestdata.getContractWithFreshRun,
    ...ParameterGetterTestData.default
  )
  .thenThrow(
    "if there is a current run, and it is not fully defined, an error is thrown",
    "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called"
  )

  .ifCalledWith(
    ParameterTestdata.getContractWithNonDefaultCaseAndCurrentRun,
    ...ParameterGetterTestData.default
  )
  .thenReturn(
    "we put the current run into the current case",
    ReturnValueTestData.getContractWithNonDefaultCaseWithARunStored
  )

  .ifCalledWith(
    ParameterTestdata.getContractWithTitleAndRun,
    ...ParameterGetterTestData.default
  )
  .thenReturn(
    "if there was no current case, we create it",
    ReturnValueTestData.getContractWithParametersInDefaultCase
  )

  .ifCalledWith(
    ParameterTestdata.getContractWithFreshRun,
    ...ParameterGetterTestData.default
  )
  .thenThrow(
    "if the previous run is not defined with at least a return value or exception, an error is signalled",
    "The function under test:undefined:undefined: current run is incomplete: neither thenReturn nor thenThrow was called"
  );
