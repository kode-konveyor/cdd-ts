import { Contract } from "../src/contract/Contract.js";
import { CDDConfiguration } from "../src/runner/config.js";
import { makeTestData, TestDataDescriptor } from "../src/util/makeTestData.js";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { CDDConfigurationTestData, CDDConfigurationTestDataDescriptor, JS_DIR } from "../testdata/CDDConfigurationTestData.js";

export const makeTestDataContractParties = [makeTestData]
export const makeTestDataContract = new Contract<typeof makeTestData<CDDConfiguration,TestDataDescriptor<CDDConfiguration>>>()
    .setTitle("makes test data from configuration descriptor")
    .ifCalledWith(getTestDataDescriptor)
    .thenReturn("empy descriptor yields empty testData",() => {return {}})
    .ifCalledWith(getTestDataDescriptorWIthFrom,() => CDDConfigurationTestData.getCDDConfiguration)
    .thenReturn("if __from is '' then a new item with the constructor is created",() => {return {getOne: annotateFunction(CDDConfigurationTestData.getCDDConfiguration)}})
    .ifCalledWith(getTestDataDescriptorWIthFrom)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .thenReturn("if no constructor is defined, a '{}' is used",() => {
        return {
            getOne: (annotateFunction(() => {return {}}) as () => CDDConfiguration)
        }
    })
    .ifCalledWith(() => {return {getOne:{__from: "", jsDir: JS_DIR}}},() => CDDConfigurationTestData.getCDDConfiguration)
    .thenReturn("the fields are set from the descriptor",() => {return {getOne: annotateFunction(CDDConfigurationTestData.getCDDConfigurationWithJsDir)}})
    .ifCalledWith(() => {return {getOne:{__from: "", jsDir: JS_DIR}, getTwo: {__from: "getOne", moduleResolution: "ES"}}},() => CDDConfigurationTestData.getCDDConfiguration)
    .thenReturn("if __from is not empty, the named getter is used for the data",() => {return {
        getOne: annotateFunction(CDDConfigurationTestData.getCDDConfigurationWithJsDir),
        getTwo: annotateFunction(CDDConfigurationTestData.getCDDConfigurationES)
    }})
    .suchThat("the getter referenced in __from is not modified",value => {
        if(value['getOne']().moduleResolution!=="") {
            throw new Error("leak detected")
        }
    })
    .ifCalledWith(() => {return {
        getTwo: {__from: "getOne", moduleResolution: "ES"},
        getOne:{__from: "", jsDir: JS_DIR}}},() => CDDConfigurationTestData.getCDDConfiguration)
    .thenThrow("if __from references an item which is later or does not exist, that is an error", "did you reference a later item in __from?")
;

function getTestDataDescriptorWIthFrom(): TestDataDescriptor<CDDConfiguration> {
    return { getOne: { __from: "" } };
}

function getTestDataDescriptor(): TestDataDescriptor<CDDConfiguration> {
    return {};
}

