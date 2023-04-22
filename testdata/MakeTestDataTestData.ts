import { type CDDConfiguration } from "../src/types/CDDConfiguration.js";
import {
  CDDConfigurationTestData,
  JS_DIR,
} from "./CDDConfigurationTestData.js";

export const MakeTestDataTestData = {
  default: () => {
    return {};
  },
  withFrom: () => {
    return { getOne: { __from: "" } };
  },
  constructor: () => CDDConfigurationTestData.getCDDConfiguration,
  withField: () => {
    return { getOne: { __from: "", jsDir: JS_DIR } };
  },
  withNamedGetter: () => {
    return {
      getOne: { __from: "", jsDir: JS_DIR },
      getTwo: { __from: "getOne", moduleResolution: "ES" },
    };
  },
  withTransform: () => {
    return {
      getOne: { __from: "", jsDir: JS_DIR },
      getTwo: {
        __from: "getOne",
        __transform: (draft: CDDConfiguration) => {
          draft.moduleResolution = "ES";
        },
      },
    };
  },

  withNonexistingReference: () => {
    return {
      getTwo: { __from: "getOne", moduleResolution: "ES" },
      getOne: { jsDir: JS_DIR },
    };
  },
  badAdd: () => {
    return {
      getOne: {
        __from: "",
        __add: ["baz", "bar", "foo"] as [string, string, unknown],
      },
    };
  },
};
