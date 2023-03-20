import { Contract } from "../src/contract/Contract.js";
import { CDDConfiguration } from "../src/runner/config.js";
import { makeTestData, TestDataDEscriptor } from "../src/util/makeTestData.js";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { JS_DIR } from "../testdata/CDDConfiguration/CDDConfigurationTestData.js";
import { getCDDConfiguration } from "../testdata/CDDConfiguration/getCDDConfiguration.js";
import { getCDDConfigurationES } from "../testdata/CDDConfiguration/getCDDConfigurationES.js";
import { getCDDConfigurationWithJsDir } from "../testdata/CDDConfiguration/getCDDConfigurationWithJsDir.js";


export const makeTestDataContractParties = [makeTestData]
export const makeTestDataContract = new Contract<typeof makeTestData<CDDConfiguration>>()
    .setTitle("makes test data from configuration descriptor")
    .ifCalledWith(getTestDataDescriptor)
    .thenReturn("empy descriptor yields empty testData",() => {return {}})
    .ifCalledWith(getTestDataDescriptorWIthFrom,() => getCDDConfiguration)
    .thenReturn("if __from is '' then a new item with the constructor is created",() => {return {getOne: annotateFunction(getCDDConfiguration)}})
    .ifCalledWith(() => {return {getOne:{__from: "", jsDir: JS_DIR}}},() => getCDDConfiguration)
    .thenReturn("the fields are set from the descriptor",() => {return {getOne: annotateFunction(getCDDConfigurationWithJsDir)}})
    .ifCalledWith(() => {return {getOne:{__from: "", jsDir: JS_DIR}, getTwo: {__from: "getOne", moduleResolution: "ES"}}},() => getCDDConfiguration)
    .thenReturn("if __from is not empty, the named getter is used for the data",() => {return {
        getOne: annotateFunction(getCDDConfigurationWithJsDir),
        getTwo: annotateFunction(getCDDConfigurationES)
    }})
    .ifCalledWith(() => {return {
        getTwo: {__from: "getOne", moduleResolution: "ES"},
        getOne:{__from: "", jsDir: JS_DIR}}},() => getCDDConfiguration)
    .thenThrow("if __from references an item which is later or does not exist, that is an error", "did you reference a later item in __from?")

function getTestDataDescriptorWIthFrom(): TestDataDEscriptor<CDDConfiguration> {
    return { getOne: { __from: "" } };
}

function getTestDataDescriptor(): TestDataDEscriptor<CDDConfiguration> {
    return {};
}

