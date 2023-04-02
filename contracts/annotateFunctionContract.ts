import { Contract } from "../src/contract/Contract.js";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { diff } from "../src/util/diff.js";
import { AnnotatedFunctionTestData } from "../testdata/AnnotatedFunctionTestData.js";
import { FunctionAnnotationtestData } from "../testdata/FunctionAnnotationtestData.js";

function returnValueCheckerForFunctionAnnotation(name: string) {
    return (returnValue: () => unknown, funktione: () => unknown) => {
        const annotation = (returnValue as unknown as { displayName: string; }).displayName;
        if (annotation !== name)
            throw Error(diff(name, annotation));
    }
}

export const annotateFunctionContractParties = [annotateFunction]

export const annotateFunctionContract = new Contract<typeof annotateFunction>()
    .setTitle("Annotates a getter such that it is serialized showing the data it returns with")
    .ifCalledWith(AnnotatedFunctionTestData.default)
    .thenReturn("shows the data", AnnotatedFunctionTestData.default)
    .suchThat("the displayName attribute contains the annotation", returnValueCheckerForFunctionAnnotation(FunctionAnnotationtestData.default))
    .ifCalledWith(AnnotatedFunctionTestData.getter)
    .thenReturn("getters returning different values have different names even if created in the same place", AnnotatedFunctionTestData.getter)
    .suchThat("the displayName attribute contains the annotation", returnValueCheckerForFunctionAnnotation(FunctionAnnotationtestData.getter))

