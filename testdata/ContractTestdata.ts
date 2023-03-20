import { Contract } from "../src/cdd-ts.js";
import { makeTestData } from "../src/util/makeTestData.js";
import { CaseDescriptorTestData } from "./CaseDescriptorTestData.js";
import { TestedFunctionType } from "./MethodTestData.js";
import { RunDescriptorTestData } from "./RunDescriptorTestData.js";
import { getSideEffectCheckCase } from "./SideEffectCheckCaseTestData.js";

export const CONTRACT_EXPLANATION = "The function under test";
export const RUN_IDENTIFICATION = "The function under test::run explanation:"
export const NONDEFAULT_CASE_NAME = "Global multiplier is 3";

export const ContractTestData = makeTestData<Contract<TestedFunctionType>>({
    getContract: { __from: "" },
    getContractWithTitle: {
        __from: "getContract",
        explanation: CONTRACT_EXPLANATION
    },
    getContractWithTitleAndRun: {
        __from: "getContractWithTitle",
        currentRun: RunDescriptorTestData["getRunDescriptorCorrectlyBuilt"]()
    },
    getContractWithDefaultCase: {
        __from: "getContractWithTitle",
        cases: { "": CaseDescriptorTestData["getCaseDescriptor"]() }
    },
    getContractWithFreshRun: {
        __from: "getContractWithDefaultCase",
        currentRun: RunDescriptorTestData["getRunDescriptorWithExplanation"]()
    },
    getContractWithRunInDefaultCase: {
        __from: "getContractWithFreshRun",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithCorrectRun"]() }
    },
    getContractThrowingAnotherException: {
        __from: "getContractWithRunInDefaultCase",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithThrowingAnotherExceptionRun"]() }
    },
    getContractThrowingUnexpectedException: {
        __from: "getContractWithRunInDefaultCase",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithThrowingExceptio"]() }
    },
    getContractWithFailingReturnvalueCheck: {
        __from: "getContractWithRunInDefaultCase",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithReturnValueCheckFailing"]() }
    },
    getContractWithFailingSideEffectCheck: {
        __from: "getContractWithRunInDefaultCase",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithSideEffectCheckCheckFailing"]() }
    },
    getContractWithOtherReturnValue: {
        __from: "getContractWithRunInDefaultCase",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithOtherReturnValue"]() }
    },
    getContractNotThrowingDefinedException: {
        __from: "getContractWithFreshRun",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithThrowingRun"]() }
    },
    getContractWithCorrectCurrentRun: {
        __from: "getContractWithDefaultCase",
        currentRun: RunDescriptorTestData["getRunDescriptorCorrectlyBuilt"]()
    },
    getContractWithGlobalSideEffectCheck: {
        __from: "getContractWithCorrectCurrentRun",
        sideEffectChecks: [getSideEffectCheckCase()]
    },
    getContractWithGlobalSideEffectCheckNotHolding: {
        __from: "getContractWithGlobalSideEffectCheck",
        currentRun: RunDescriptorTestData["getRunDescriptorNotTriggeringSideEffect"]()
    },
    getContractThrowingTheDefinedException: {
        __from: "getContractWithDefaultCase",
        currentRun: RunDescriptorTestData["getRunDescriptorCheckingException"]()
    },
    getContractWithRunWithParametersInDefaultCase: {
        __from: "getContractWithDefaultCase",
        cases: { "": CaseDescriptorTestData["getCaseDescriptorWithCorrectRun"]() }
    },
    getContractWithCorrectRunInDefaultCase: {
        __from: "getContractWithRunWithParametersInDefaultCase",
        currentRun: RunDescriptorTestData["getRunDescriptorParametersSet"]()
    },
    getContractWithNonDefaultCase: {
        __from: "getContractWithDefaultCase",
        currentCase: NONDEFAULT_CASE_NAME,
        __add: ["cases", NONDEFAULT_CASE_NAME, CaseDescriptorTestData["getCaseDescriptor"]()],
    },
    getContractWithManipulatorSet: {
        __from: "getContractWithNonDefaultCase",
        __add: ["cases", NONDEFAULT_CASE_NAME, CaseDescriptorTestData["getCaseDescriptorWithManipulatorset"]()],
    },
    getContractWithRunInNonDefaultCaseNoCurrentRun: {
        __from: "getContractWithManipulatorSet",
        __add: ["cases", "", CaseDescriptorTestData["getCaseDescriptorWithCorrectRun"]()],
    },
    getContractWithManipulatorSetAndRun: {
        __from: "getContractWithNonDefaultCase",
        __add: ["cases", NONDEFAULT_CASE_NAME, CaseDescriptorTestData["getCaseDescriptorWithManipulatorsetAndRun"]()],
    },
    getContractWithNonDefaultCaseAndCurrentRun: {
        __from: "getContractWithNonDefaultCase",
        currentRun: RunDescriptorTestData["getRunDescriptorCorrectlyBuilt"](),
    },
    getContractWithNonDefaultCaseWithARunStored: {
        __from: "getContractWithNonDefaultCaseAndCurrentRun",
        currentRun: RunDescriptorTestData["getRunDescriptorParametersSet"](),
        __add: ["cases", NONDEFAULT_CASE_NAME, CaseDescriptorTestData["getCaseDescriptorWithCorrectRun"]()],
    },
    getContractWithRunInDefaultCaseAndNonDefaultCaseWithManipulatorSet: {
        __from: "getContractWithNonDefaultCaseAndCurrentRun",
        __add: ["cases", NONDEFAULT_CASE_NAME, CaseDescriptorTestData["getCaseDescriptorWithManipulatorset"]()],
    },
    getContractWithParametersSet: {
        __from: "getContractWithDefaultCase",
        currentRun: RunDescriptorTestData["getRunDescriptorParametersSet"]()
    },
}, () => new Contract<TestedFunctionType>())

