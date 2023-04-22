/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { ContractEntity } from "../src/types/ContractEntity.js";
import type { MethodType } from "../src/types/MethodType.js";
import { CheckCurrentRunContractTestData } from "./CheckCurrentRunContractTestData.js";
import { ReturnValueCheckTestData } from "./ReturnValueCheckTestData.js";

export const CheckCurrentRunResultTestData = {
  default: CheckCurrentRunContractTestData.getContract,
  putsItToThecurrentCase: {
    default:
      CheckCurrentRunContractTestData.getContractWithCorrectRunInDefaultCaseNoCurrentRun,
    check: (
      retval: ContractEntity<MethodType>,
      contract: ContractEntity<MethodType>
    ) => {
      return contract.currentRun === undefined
        ? ReturnValueCheckTestData.putTotheCurrentCaseAtZero(retval, contract)
        : "oops";
    },
  },
  putsItIntoTheCurrentCaseAfterTheExistingOne: {
    default:
      CheckCurrentRunContractTestData.getContractWithRunInDefaultCaseTwice,
    check: (
      retval: ContractEntity<MethodType>,
      contract: ContractEntity<MethodType>
    ) =>
      ReturnValueCheckTestData.currentRunIsCleared(retval, contract) ??
      ReturnValueCheckTestData.putTotheCurrentCaseAtOne(retval, contract) ??
      ReturnValueCheckTestData.putTotheCurrentCaseAtZero(retval, contract),
  },
};
