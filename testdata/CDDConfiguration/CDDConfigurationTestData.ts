import { CDDConfiguration } from "../../src/runner/config.js";
import { TestDataDEscriptor, makeTestData } from "../../src/util/makeTestData.js";

export const JS_DIR = "some_directory/far/far/away";


const getCDDConfiguration:TestDataDEscriptor<CDDConfiguration> = {
    getCDDConfiguration: {
        __from: "",
        moduleResolution: "",
        jsDir: ""
    },
    getCDDConfigurationES: {
        __from: "",
        moduleResolution: "ES",
        jsDir: JS_DIR
    },
        getCDDConfigurationEsbuild: {
            __from: "getCDDConfigurationES",
            moduleResolution: "esbuild",
        }
}

export const CDDConfigurationTestData = makeTestData<CDDConfiguration>(
    getCDDConfiguration,
    () => {
        return {
            moduleResolution: "", 
            jsDir: ""
        }
    })

