import { CDDConfiguration } from "../src/types/CDDConfiguration";
import { makeTestData } from "../src/util/makeTestData.js";

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
    }
}

export const CDDConfigurationTestData = makeTestData<CDDConfiguration, typeof CDDConfigurationTestDataDescriptor>(CDDConfigurationTestDataDescriptor)