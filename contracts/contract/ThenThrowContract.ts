import { Contract } from "../../src/contract/Contract.js";
import { ThenThrowService } from "../../src/contract/ThenThrowService.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";

const ContractTestData = makeTestData<
  ThenThrowService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new ThenThrowService<TestedFunctionType>());

export const ThenThrowContractParties = [
  ThenThrowService.prototype.thenThrow.call.bind(
    ThenThrowService.prototype.thenThrow
  ),
];

const NO_IFCALLEDWITH_BEFORE_THENTHROW =
  "ifCalledWith is missing before thenThrow";
export const ThenThrowContract = new Contract<
  typeof ThenThrowService.prototype.thenThrow.call
>()
  .setTitle("sets the explanation and expected thrown message for the case")
  .ifCalledWith(
    ContractTestData.getContractThrowingUnexpectedException,
    LabelTestdata.runExplanation,
    LabelTestdata.exceptionThrown
  )
  .thenReturn(
    "expects an explanation an a return value getter",
    ContractTestData.getContractCheckingTheDefinedException
  )
  .ifCalledWith(
    ContractTestData.getContract,
    LabelTestdata.runExplanation,
    LabelTestdata.exceptionThrown
  )
  .thenThrow(
    "if no ifCalledWith was called before, an error is thrown",
    NO_IFCALLEDWITH_BEFORE_THENTHROW
  );
