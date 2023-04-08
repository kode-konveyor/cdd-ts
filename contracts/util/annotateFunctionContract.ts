import { Contract } from "../../src/contract/Contract.js";
import { annotateFunction } from "../../src/util/annotateFunction.js";
import { AnnotatedFunctionTestData } from "../../testdata/AnnotatedFunctionTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";

export const annotateFunctionContractParties = [annotateFunction];

export const annotateFunctionContract = new Contract<typeof annotateFunction>()
  .setTitle(
    "Annotates a getter such that it is serialized showing the data it returns with"
  )
  .ifCalledWith(AnnotatedFunctionTestData.default)
  .thenReturn("shows the data", AnnotatedFunctionTestData.default)
  .suchThat(
    "the displayName attribute contains the annotation",
    ReturnValueCheckTestData.annotateFunctionDefault
  )
  .ifCalledWith(AnnotatedFunctionTestData.getter)
  .thenReturn(
    "getters returning different values have different names even if created in the same place",
    AnnotatedFunctionTestData.getter
  )
  .suchThat(
    "the displayName attribute contains the annotation",
    ReturnValueCheckTestData.annotateFunctionGetter
  );
