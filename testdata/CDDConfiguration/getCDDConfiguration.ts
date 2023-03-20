import { CDDConfiguration } from "../../src/runner/config.js";
import { annotateFunction } from "../../src/util/annotateFunction.js";

export const getCDDConfiguration = annotateFunction(():CDDConfiguration => {
    return { moduleResolution: "", jsDir: "" };
})
