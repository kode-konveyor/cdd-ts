import { type CDDConfiguration } from "../src/types/CDDConfiguration";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";

export const MadeTestDataTestData = {
  default: () => {
    return {};
  },
  withFrom: () => {
    return {
      getOne: annotateFunction(CDDConfigurationTestData.getCDDConfiguration),
    };
  },
  withFromNoConstructor: () => {
    return {
      getOne: annotateFunction(() => {
        return {};
      }) as () => CDDConfiguration,
    };
  },
  withField: () => {
    return {
      getOne: annotateFunction(
        CDDConfigurationTestData.getCDDConfigurationWithJsDir
      ),
    };
  },
  withnamedGetter: () => {
    return {
      getOne: annotateFunction(
        CDDConfigurationTestData.getCDDConfigurationWithJsDir
      ),
      getTwo: annotateFunction(CDDConfigurationTestData.getCDDConfigurationES),
    };
  },
};
