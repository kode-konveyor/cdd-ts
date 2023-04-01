import { CDDConfiguration } from "../src/types/CDDConfiguration";
import { makeTestData, TestDataDescriptor } from "../src/util/makeTestData.js";

export const JS_DIR = "some_directory/far/far/away";


export const CDDConfigurationTestDataDescriptor = {
    getCDDConfiguration: {
        __from: "",
        moduleResolution: "",
        jsDir: ""
    },
    getCDDConfigurationWithJsDir: {
        __from: "getCDDConfiguration",
        jsDir: JS_DIR
    },
    getCDDConfigurationES: {
        __from: "getCDDConfigurationWithJsDir",
        moduleResolution: "ES",
    },
    getCDDConfigurationEsbuild: {
        __from: "getCDDConfigurationWithJsDir",
        moduleResolution: "esbuild",
    },
    getCDDConfigurationTenTests: {
        __from: "getCDDConfigurationWithJsDir",
        numberofTests: "10"
    }
} satisfies TestDataDescriptor<CDDConfiguration>;

export const CDDConfigurationTestData = makeTestData<CDDConfiguration, typeof CDDConfigurationTestDataDescriptor>(CDDConfigurationTestDataDescriptor)