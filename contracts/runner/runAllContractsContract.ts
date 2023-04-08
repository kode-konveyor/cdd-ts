import { Contract, runAllContracts } from "../../src/cdd-ts.js";
import { Check } from "../../src/check/Check.js";
import { checkThrowAsync } from "../../src/util/checkThrowAsync.js";
import { ConsoleLogChecker } from "../../src/util/ConsoleLogChecker.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { serialize } from "../../src/util/serialize.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { ContractTestDataDescriptor } from "../../testdata/ContractTestdata.js";
import {
  TestedFunctionType,
  TestedFunctionTestData,
} from "../../testdata/MethodTestData.js";

const ContractTestData = makeTestData<
  Contract<TestedFunctionType>,
  typeof ContractTestDataDescriptor
>(ContractTestDataDescriptor, () => new Contract<TestedFunctionType>());

const RETURNVALUE_MISMATCH = "returnvalue mismatch";
const CheckContract = new Contract<typeof Check.prototype.check>()
  .setTitle(
    "check checks whether the contract actually corresponds to the behaviour of the SUT"
  )
  .ifCalledWith(
    ContractTestData.getContractWithSideEffectCheckAndThrowingRun,
    TestedFunctionTestData.default
  )
  .thenThrow(
    "side effect checks are recommended to enter a mutex in setUp and unlock it in tearDown. TearDown will be called even if the test fails",
    RETURNVALUE_MISMATCH
  );

export const runAllContractsContractParties = [1];
const NO_EXCEPTION_THROWN = "no exception was thrown";
const BAR = "bar";
const RETURN_VALUE_MISMATCH = "return value mismatch";
const NO_CONTRACT_TESTED = "no contracts tested";
const PLEASE_EXPORT_PARTIES =
  "please export emptyContractPartiesContractParties from testdata/contracts/emptyContractPartiesContract.ts";
const PLEASE_EXPORT_CONTRACT =
  " please export emptyContractConstContract from testdata/contracts/emptyContractConstContract.ts";
const NO_CHECKS_IN_EMPTY_CONTRACT = "no checks in contract empty contract";
export const runAllContractsContract = {
  async check() {
    const oldlog = console.error;
    const logged: Array<unknown> = [];
    console.error = (...params) => {
      logged.push(params);
    };
    let checkCount = await runAllContracts(
      CDDConfigurationTestData.runsomeContracts()
    );
    console.error = oldlog;
    if (String(logged) !== String([["number of contracts tested: ", 1]]))
      throw new Error(serialize(logged));
    if (checkCount !== 1)
      throw new Error(
        "expected 1 contracts, but got " + String(checkCount) + "."
      );

    checkCount += await checkThrowAsync(
      runAllContracts,
      [CDDConfigurationTestData.runEmptyContract()],
      NO_CHECKS_IN_EMPTY_CONTRACT,
      1
    );

    checkCount += await checkThrowAsync(
      runAllContracts,
      [CDDConfigurationTestData.emptyContractConstContract()],
      PLEASE_EXPORT_CONTRACT,
      1
    );
    checkCount += await checkThrowAsync(
      runAllContracts,
      [CDDConfigurationTestData.emptyContractPartiesContract()],
      PLEASE_EXPORT_PARTIES,
      1
    );
    checkCount += await checkThrowAsync(
      runAllContracts,
      [CDDConfigurationTestData.runNoContract()],
      NO_CONTRACT_TESTED,
      1
    );
    checkCount += await runAllContracts(
      CDDConfigurationTestData.runOneContract()
    );
    checkCount += await checkThrowAsync(
      CheckContract.check.bind(CheckContract),
      [CheckContract.check.call.bind(CheckContract.check)],
      RETURN_VALUE_MISMATCH,
      1
    );

    const checker = new ConsoleLogChecker("foo");
    checker.oldlog = console.error;
    checker.tearDown();
    if (console.log !== console.error) throw new Error("upps");
    console.log = oldlog;
    checkCount += 1;

    checker.record = [["bar"]];
    checkCount += await checkThrowAsync(
      checker.check.bind(checker),
      [],
      BAR,
      1
    );

    checker.record = [["foo"]];
    const checkerChecker = (): void => checker.check();

    checkCount += await checkThrowAsync(
      checkerChecker,
      [],
      NO_EXCEPTION_THROWN,
      1
    );

    new ConsoleLogChecker("\\[]").check();
    return checkCount;
  },
};
