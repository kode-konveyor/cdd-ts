import { JS_DIR } from "./CDDConfigurationTestData.js";

export const ModuleNameTestData = {
  default: () => "contracts/fooContract.ts",
  ES: () => "../../../" + JS_DIR + "/contracts/fooContract.js",
  Esbuild: () => "../../../" + JS_DIR + "/contracts/fooContract.cjs",
};
