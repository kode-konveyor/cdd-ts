import { CheckCurrentRun } from "../src/contract/CheckCurrentRun.js";
import { CaseDescriptorEntity } from "../src/types/CaseDescriptorEntity.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { MethodType } from "../src/types/MethodType.js";
import { ReturnValueCheckType } from "../src/types/ReturnValueCheckType.js";
import { RunDescriptorEntity } from "../src/types/RunDescriptorEntity.js";
import { diff } from "../src/util/diff.js";
import { getParametersFromGetters } from "../src/util/getParametersFromGetters.js";
import { serialize } from "../src/util/serialize.js";
import { CallType } from "./CallType";
import { checkThrow } from "../src/util/checkThrow.js";
import { FunctionAnnotationtestData } from "./FunctionAnnotationtestData.js";
import { TestedFunctionType } from "./MethodTestData.js";
import { ParameterTestData } from "./ParametersTestData.js";
import { getReturnValueTestData } from "./ReturnValueTestData.js";
import { TestData, TestDataDescriptor } from "../src/util/makeTestData.js";
import { CDDConfiguration } from "../src/types/CDDConfiguration.js";
import { When } from "../src/contract/When.js";
import { LabelTestdata } from "./LabelTestdata.js";


export const ReturnValueCheckTestData = {
    annotateFunctionDefault: forFunctionAnnotation(FunctionAnnotationtestData.default),
    annotateFunctionGetter: forFunctionAnnotation(FunctionAnnotationtestData.getter),
    putTotheCurrentCaseAtZero: putTotheCurrentCase(0),
    putTotheCurrentCaseAtOne:  putTotheCurrentCase(1),
    currentRunIsCleared,
    neitherReturnNorThrown,
    stubReturnsDefinedReturnValue: (stub: TestedFunctionType) => {
        return (stub(... (getParametersFromGetters(ParameterTestData.default()) as [number, string])) === getReturnValueTestData.getReturnValue()) ? undefined : "oops"
    },
    mixinStubReturnsDefinedReturnValue: (stub: (this: number, arg2: string) => string) => {
        return (stub.call(... (getParametersFromGetters(ParameterTestData.default()) as [number, string])) === getReturnValueTestData.getReturnValue()) ? undefined : "oops"
    },
    stubThrowsException: (stub: TestedFunctionType) => checkThrow(
        stub,
        getParametersFromGetters(ParameterTestData.exceptionThrowing()) as [number,string],
        LabelTestdata.exceptionThrown(),
        undefined),
    stubReturnsOne: (stub: TestedFunctionType) => {
        const ret = stub(...getParametersFromGetters(ParameterTestData.exceptionThrowing()) as [number,string]);
        return ret === "1" ? undefined : ret
    },
    stubThrowsMultipleDefinedParameterException:  (stub: TestedFunctionType) => checkThrow(
        stub,
        getParametersFromGetters(ParameterTestData.withSideEffects()) as [number,string],
        "those parameters are not defined exactly once for this case",
        undefined),
    makeTestDataLeakTest: (value: TestData<CDDConfiguration, TestDataDescriptor<CDDConfiguration>>):void => {
        if ((value['getOne'] as unknown as () => CDDConfiguration)().moduleResolution !== "") {
            throw new Error("leak detected")
        }
    },
    newCaseChecker: (
        returnValue: ContractEntity<typeof When.prototype.when.call>,
    ): "no case added" | undefined  => {
        if( returnValue.cases[LabelTestdata.nondefaultCaseName()] != null )
            return undefined
        return "no case added"
    },
    currentCaseChecker: (
        returnValue: ContractEntity<typeof When.prototype.when.call>,
    ): "currentCase is not the expected" | undefined => {
        if (returnValue.currentCase === LabelTestdata.nondefaultCaseName())
            return undefined
        return "currentCase is not the expected"
    },

    failing: ()=> () =>"returnvalue check failure",
    passing: ()=> () => undefined

};

function forFunctionAnnotation(name: string) {
    return (returnValue: () => unknown) => {
        const annotation = (returnValue as unknown as { displayName: string; }).displayName;
        if (annotation !== name)
            throw Error(diff(name, annotation));
    };
}

function putTotheCurrentCase(runNumber: number):  ReturnValueCheckType<CallType<
    MethodType,
    typeof CheckCurrentRun.prototype.checkCurrentRun<MethodType>,
    ContractEntity<MethodType>
>> {
    return (returnValue: ContractEntity<MethodType>, contract: ContractEntity<MethodType>) =>
        ((contract
            .cases[""] as CaseDescriptorEntity<MethodType>)
            .runs[runNumber] as RunDescriptorEntity<MethodType>)
            .explanation === LabelTestdata.runExplanation() ? undefined : serialize(contract);
}

function currentRunIsCleared (retval: ContractEntity<MethodType>, contract:ContractEntity<MethodType>): RunDescriptorEntity<MethodType> | undefined{
    return contract.currentRun
}

function neitherReturnNorThrown(contract: ContractEntity<MethodType>): "not this case" | undefined{
    const c = contract
    if ((c.currentRun != null) && c.currentRun.thrown === undefined && c.currentRun.returnValueGetter === undefined)
        return undefined
    return "not this case"
}


