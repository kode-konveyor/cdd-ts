import { bound } from "../../src/cdd-ts.js";
import { Contract } from "../../src/contract/Contract.js";
import { AnnotateFunctionService } from "../../src/util/AnnotateFunctionService.js";
import { AnnotatedFunctionTestData } from "../../testdata/AnnotatedFunctionTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";

export const annotateFunctionContractParties = [bound(AnnotateFunctionService)];

export const annotateFunctionContract = new Contract<
  AnnotateFunctionService["annotateFunction"]
>()
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
