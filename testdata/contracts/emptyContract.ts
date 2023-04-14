import { Contract } from "../../src/contract/Contract.js";
import type { TestedFunctionType } from "../MethodTestData.js";
import { TestedFunctionTestData } from "../MethodTestData.js";

export const emptyContractParties = [TestedFunctionTestData.default()];
export const emptyContract = new Contract<TestedFunctionType>().setTitle(
  "empty contract"
);
