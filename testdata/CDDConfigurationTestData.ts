import { type CDDConfiguration } from "../src/types/CDDConfiguration";
import { type TestDataDescriptor } from "src/types/TestDataDescriptor";
import { MakeTestDataService } from "../src/util/MakeTestDataService.js";

export const JS_DIR = "some_directory/far/far/away";

export const CDDConfigurationTestDataDescriptor = {
  getCDDConfiguration: {
    moduleResolution: "" as unknown as "ES",
    jsDir: "",
  },
  defaultConfig: {
    watch: false,
    distFiles: "dist/**/*.js",
    contracts: "contracts/**/*Contract.ts",
    jsDir: "dist",
    moduleResolution: "ES",
    debug: false,
  },
  debug: {
    __from: "defaultConfig",
    debug: true,
  },
  getCDDConfigurationWithJsDir: {
    __from: "getCDDConfiguration",
    jsDir: JS_DIR,
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
    numberofTests: "10",
  },
  runsomeContracts: {
    __from: "defaultConfig",
    contracts: "contracts/util/diffContract.ts",
  },
  runEmptyContract: {
    __from: "defaultConfig",
    contracts: "testdata/contracts/emptyContract.ts",
  },
  emptyContractConstContract: {
    __from: "defaultConfig",
    contracts: "testdata/contracts/emptyContractConstContract.ts",
  },
  emptyContractPartiesContract: {
    __from: "defaultConfig",
    contracts: "testdata/contracts/emptyContractPartiesContract.ts",
  },
  runNoContract: {
    __from: "defaultConfig",
    contracts: "testdata/contracts/NoSuchContract.ts",
  },
  runOneContract: {
    __from: "defaultConfig",
    contracts: "testdata/contracts/oneContract.ts",
  },
} satisfies TestDataDescriptor<CDDConfiguration>;

export const CDDConfigurationTestData = new MakeTestDataService<
  CDDConfiguration,
  typeof CDDConfigurationTestDataDescriptor
>().makeTestData(CDDConfigurationTestDataDescriptor);
