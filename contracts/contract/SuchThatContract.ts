import { Contract } from "../../src/contract/Contract.js";
import { SuchThat } from "../../src/contract/SuchThat.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import { LabelTestdata } from "../../testdata/LabelTestdata.js";
import type { TestedFunctionType } from "../../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";

const ContractTestData = makeTestData<
  SuchThat<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new SuchThat<TestedFunctionType>());

export const SuchThatContractParties = [
  SuchThat.prototype.suchThat.call.bind(SuchThat.prototype.suchThat),
];
const NO_IFCALLEDWITH_BEFORE_SUCHTHAT =
  "ifCalledWith is missing before suchThat";
export const SuchThatContract = new Contract<
  typeof SuchThat.prototype.suchThat
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
