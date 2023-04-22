import { CheckCurrentRunService } from "../src/contract/CheckCurrentRunService.js";
import type { ContractEntity } from "../src/types/ContractEntity.js";
import type { TestedFunctionType } from "./MethodTestData.js";
import { MakeTestDataService } from "../src/cdd-ts.js";
import { caseNameContract } from "../contracts/contract/caseNameContract.js";
import { messageFormatContract } from "../contracts/util/messageFormatContract.js";
import { type WithCorrectRun } from "../src/types/WithCorrectRun.js";
import { ContractTestDataDescriptor } from "./ContractTestdata.js";

export const CheckCurrentRunContractTestData = new MakeTestDataService<
  WithCorrectRun<TestedFunctionType, ContractEntity<TestedFunctionType>>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new CheckCurrentRunService(
      caseNameContract.getStubForMixin(),
      messageFormatContract.getStub()
    ) as WithCorrectRun<TestedFunctionType, ContractEntity<TestedFunctionType>>
);
