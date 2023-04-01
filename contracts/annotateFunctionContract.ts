import { Contract } from "../src/contract/Contract.js";
import { CDDConfiguration } from "../src/types/CDDConfiguration";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { diff } from "../src/util/diff.js";
import { makeGetters } from "../src/util/makeGetters.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";

const a = makeGetters([1])[0]
export const b = makeGetters([2])[0]


export const annotateFunctionContractParties = [annotateFunction]
const annotatedFunction = (): () => CDDConfiguration => CDDConfigurationTestData.getCDDConfiguration;
const name = "() => {\n \"jsDir\": \"\",\n \"moduleResolution\": \"\"\n}"
export const annotateFunctionContract = new Contract<typeof annotateFunction>()
    .setTitle("Annotates a getter such that it is serialized showing the data it returns with")
    .ifCalledWith(() => CDDConfigurationTestData.getCDDConfiguration)
    .thenReturn("shows the data", annotatedFunction)
    .suchThat("the displayName attribute contains the annotation", returnValueCheckerForFunctionAnnotation(name))
    .ifCalledWith(() => a)
    .thenReturn("getters returning different values have different names even if created in the same place", () => a)
    .suchThat("the displayName attribute contains the annotation", returnValueCheckerForFunctionAnnotation("() => 1"))

function returnValueCheckerForFunctionAnnotation(name: string) {
    return (returnValue: () => unknown, funktione: () => unknown) => {
        const annotation = (returnValue as unknown as { displayName: string; }).displayName;
        if (annotation !== name)
            throw Error(diff(name, annotation));
    }
}
