import { CONTRACT_EXPLANATION, NONDEFAULT_CASE_NAME } from "./ContractTestdata.js";
import { EXCEPTION_THROWN } from "./MethodTestData.js";


export const LabelTestdata = {
    default: () => CONTRACT_EXPLANATION,
    caseName: () => NONDEFAULT_CASE_NAME,
    exceptionThrown: () => EXCEPTION_THROWN
};
