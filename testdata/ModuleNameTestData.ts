import { JS_DIR } from "./CDDConfigurationTestData.js";

export function getModuleName(): string {
    return "contracts/fooContract.ts";
}

export function getModuleNameES(): string {
    return "../../../" + JS_DIR + "/contracts/fooContract.js";
}

export function getModuleNameEsbuild(): string {
    return "../../../" + JS_DIR + "/contracts/fooContract.cjs";
}
