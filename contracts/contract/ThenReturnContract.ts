import { Contract } from "../../src/contract/Contract.js";
import { ThenReturnService } from "../../src/contract/ThenReturnService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ParameterTestData } from "../../testdata/ParameterTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";

const ContractTestData = new MakeTestDataService<
  ThenReturnService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new ThenReturnService<TestedFunctionType>()
);

export const ThenReturnContractParties = [boundCall(ThenReturnService)];

export const ThenReturnContract = new Contract<
  typeof ThenReturnService.prototype.thenReturn.call
>()
  .setTitle("sets the explanation and expected return value for the case")
  .ifCalledWith(
    ContractTestData.getContractWithParametersSet,
    LabelTestdata.runExplanation,
    ParameterTestData.returnvalueGetter
  )
  .thenReturn(
    "expects an explanation an a return value getter",
    ContractTestData.getContractWithCorrectRunAndEmptyDefaultCase
  )

  .ifCalledWith(
    ContractTestData.getContractWithParametersSet,
    LabelTestdata.runExplanation,
    ParameterTestData.checker
  )
  .thenReturn(
    "if a checker is given, then both the expected return value and the return value check are recorded",
    ContractTestData.getContractWithReturnvalueCheck
  )

  .ifCalledWith(
    ContractTestData.getContract,
    LabelTestdata.runExplanation,
    ParameterTestData.returnvalueGetter
  )
  .thenThrow(
    "if no ifCalledWith was called before, an error is thrown",
    "ifCalledWith is missing before thenReturn"
  );
