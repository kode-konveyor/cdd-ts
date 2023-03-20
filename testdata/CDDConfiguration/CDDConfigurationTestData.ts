import { CDDConfiguration } from "../../src/runner/config.js";
import { makeTestData } from "../../src/util/makeTestData.js";

export const JS_DIR = "some_directory/far/far/away";


export const CDDConfigurationTestData = makeTestData<CDDConfiguration>({
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
})

