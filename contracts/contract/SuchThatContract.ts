import { Contract } from "../../src/contract/Contract.js";
import { SuchThatService } from "../../src/contract/SuchThatService.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { boundCall } from "../../src/cdd-ts.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";

const ContractTestData = new MakeTestDataService<
  SuchThatService<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () => new SuchThatService<TestedFunctionType>()
);

export const SuchThatContractParties = [boundCall(SuchThatService)];
const NO_IFCALLEDWITH_BEFORE_SUCHTHAT =
  "ifCalledWith is missing before suchThat";
export const SuchThatContract = new Contract<
  typeof SuchThatService.prototype.suchThat
>()
  .setTitle("defines a return value check")
  .ifCalledWith(
    ContractTestData.getContractWithCorrectCurrentRun,
    LabelTestdata.pass,
    ReturnValueCheckTestData.passing
  )
  .thenReturn("", ContractTestData.getContractWithReturnvalueCheck)
  .ifCalledWith(
    ContractTestData.getContractWithTitle,
    LabelTestdata.pass,
    ReturnValueCheckTestData.passing
  )
  .thenThrow(
    "If ifCalledWith is missing, that is an error",
    NO_IFCALLEDWITH_BEFORE_SUCHTHAT
  );
