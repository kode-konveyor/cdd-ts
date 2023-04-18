import { Contract } from "../../src/contract/Contract.js";
import { ThenThrowService } from "../../src/contract/ThenThrowService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";

const ContractTestData = new MakeTestDataService<
  ThenThrowService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new ThenThrowService<TestedFunctionType>()
);

export const ThenThrowContractParties = [boundCall(ThenThrowService)];

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
