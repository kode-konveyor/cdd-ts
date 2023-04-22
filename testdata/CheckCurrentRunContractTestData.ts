import { caseNameContract } from "../contracts/contract/caseNameContract.js";
import { MakeTestDataService } from "../src/cdd-ts.js";
import { CheckCurrentRunService } from "../src/contract/CheckCurrentRunService.js";
import type { ContractEntity } from "../src/types/ContractEntity.js";
import { type WithCorrectRun } from "../src/types/WithCorrectRun.js";
import { MessageFormatService } from "../src/util/messageFormat.js";
import { ContractTestDataDescriptor } from "./ContractTestdata.js";
import { type TestedFunctionType } from "./MethodTestData.js";

export const CheckCurrentRunContractTestData = new MakeTestDataService<
  WithCorrectRun<TestedFunctionType, ContractEntity<TestedFunctionType>>,
  typeof ContractTestDataDescriptor
>().makeTestData(
  ContractTestDataDescriptor,
  () =>
    new CheckCurrentRunService(
      caseNameContract.getStubForMixin(),
      MessageFormatService.prototype.messageFormat
    ) as WithCorrectRun<TestedFunctionType, ContractEntity<TestedFunctionType>>
);
