import { Contract } from "../../src/contract/Contract.js";
import { ThenReturn } from "../../src/contract/ThenReturn.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ParameterTestData } from "../../testdata/ParametersTestData.js";

const ContractTestData = makeTestData<
  ThenReturn<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new ThenReturn<TestedFunctionType>());

export const ThenReturnContractParties = [
  ThenReturn.prototype.thenReturn.call.bind(ThenReturn.prototype.thenReturn),
];

const NO_IFCALLEDWITH_BEFORE_THENRETURN =
  "ifCalledWith is missing before thenReturn";
export const ThenReturnContract = new Contract<
  typeof ThenReturn.prototype.thenReturn.call
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
