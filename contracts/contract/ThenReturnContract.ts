import { Contract } from "../../src/contract/Contract.js";
import { ThenReturnService } from "../../src/contract/ThenReturnService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ParameterTestData } from "../../testdata/ParametersTestData.js";
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

const NO_IFCALLEDWITH_BEFORE_THENRETURN =
  "ifCalledWith is missing before thenReturn";
export const ThenReturnContract = new Contract<
  typeof ThenReturnService.prototype.thenReturn.call
>()
  .setTitle("sets the explanation and expected return value for the case")
  .ifCalledWith(
    ContractTestData.getContractWithParametersSet,
    LabelTestdata.runExplanation,
    ParameterTestData.returnvaluegGetter
  )
  .thenReturn(
    "expects an explanation an a return value getter",
    ContractTestData.getContractWithCorrectRunAndEmptyDefaultCase
  )
  .ifCalledWith(
    ContractTestData.getContract,
    LabelTestdata.runExplanation,
    ParameterTestData.returnvaluegGetter
  )
  .thenThrow(
    "if no ifCalledWith was called before, an error is thrown",
    NO_IFCALLEDWITH_BEFORE_THENRETURN
  );
