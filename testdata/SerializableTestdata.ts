import { bound } from "../src/cdd-ts.js";
import {
  argparser,
  configFromFile,
  defaultConfig,
} from "../src/runner/Constants.js";
import { MkArgvService } from "../src/runner/MkArgvService.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { AnnotateFunctionService } from "../src/util/AnnotateFunctionService.js";
import { CDDConfigurationTestData } from "./CDDConfigurationTestData.js";

const mkArgv = new MkArgvService().mkArgv;
const annotateFunction = bound<AnnotateFunctionService["annotateFunction"]>(
  AnnotateFunctionService
);

const circular = {
  circular: null as unknown,
};
circular.circular = circular;
const error = new Error("hello");
error.stack = "fake stacktrace";

export const SerializableTestDataDescriptor = {
  complexObject: {
    boolean: true,
    simpleString: "foo",
    complexString: 'a \t \b \b \n \f \r " \\ \\\\ ',
    yetAnotherComplexString: "\u0000-\u0009\u000b-\u001f",
    jsonable: {
      toJSON: () => "JSONABLE",
    },
    object: {
      toJSON: "not a function",
    },
    simpleNumber: 3,
    infinity: 1 / 0,
    null: null,
    arraywithEmpty: [undefined, null],
  },
  undef: undefined,
  circular,
  objectWithFunctions: {
    a: "foo",
    b: () => {
      const egy = 1;
      return String(egy);
    },
    c: annotateFunction(() => String(1)),
  },
  error,
  empty: {},
  config: configFromFile,
  defaultConfig,
  contractEntity: new ContractEntity(),
  argparser: [
    argparser.options.map((desc) => desc.description + " " + desc.flags),
    argparser.name(),
    (argparser as unknown as { _version: string })._version,
    argparser.description(),
  ],
  defaultargv: mkArgv(CDDConfigurationTestData.defaultConfig()),
};
export type SerializableTestdata = {
  [K in keyof typeof SerializableTestDataDescriptor]: () => (typeof SerializableTestDataDescriptor)[K];
};

export const SerializableTestData: SerializableTestdata = (() => {
  const ret: Record<string, unknown> = {};
  for (const k in SerializableTestDataDescriptor) {
    ret[k] = () =>
      (SerializableTestDataDescriptor as Record<string, unknown>)[k];
  }
  return ret;
})() as SerializableTestdata;
