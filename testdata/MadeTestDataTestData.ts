import { bound } from "../src/cdd-ts.js";
import { type CDDConfiguration } from "../src/types/CDDConfiguration";
import { AnnotateFunctionService } from "../src/util/AnnotateFunctionService.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";

const annotateFunction = bound<AnnotateFunctionService["annotateFunction"]>(
  AnnotateFunctionService
);

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
