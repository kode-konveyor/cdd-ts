import { CaseDescriptorEntity } from "../../src/types/CaseDescriptorEntity.js";
import { MethodType } from "../../src/types/MethodType.js";
import { makeTestData } from "../../src/util/makeTestData.js";
import { getEnvironmentManipulatorThrice } from "../EnvironmentManipulator/getEnvironmentManipulatorThrice.js";
import { RunDescriptorTestData } from "../RunDescriptor/RunDescriptorTestData.js";

export const CaseDescriptorTestData = makeTestData<CaseDescriptorEntity<MethodType>>({
    getCaseDescriptor: { __from: "" },
    getCaseDescriptorWithCorrectRun: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorCorrectlyBuilt"]()]
    },
    getCaseDescriptorWithOtherReturnValue: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorWithOtherreturnValue"]()]
    },
    getCaseDescriptorWithReturnValueCheckFailing: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorWithReturnValueCheckFailing"]()]
    },
    getCaseDescriptorWithSideEffectCheckCheckFailing: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorWithSideEffectCheckCheckFailing"]()]
    },
    getCaseDescriptorWithThrowingRun: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorThrowing"]()]
    },
    getCaseDescriptorWithThrowingExceptio: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorThrowingException"]()]
    },
    getCaseDescriptorWithThrowingAnotherExceptionRun: { __from: "getCaseDescriptor",
        runs: [RunDescriptorTestData["getRunDescriptorThrowingAnotherException"]()]
    },
    getCaseDescriptorWithManipulatorset: { __from: "getCaseDescriptor",
        setUp: getEnvironmentManipulatorThrice().setUp,
        tearDown: getEnvironmentManipulatorThrice().tearDown
    },
    getCaseDescriptorWithManipulatorsetAndRun: { __from: "getCaseDescriptorWithManipulatorset",
        runs: [RunDescriptorTestData["getRunDescriptorWithTripleReturn"]()]
    },
},
() => new CaseDescriptorEntity())

