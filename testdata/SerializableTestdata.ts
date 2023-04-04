import { argparser } from "../src/runner/argparser.js";
import { configFromFile } from "../src/runner/configFromFile.js";
import { defaultConfig } from "../src/runner/defaultConfig.js";
import { mkargv } from "../src/runner/mkargv.js";
import { ContractEntity } from "../src/types/ContractEntity.js";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { CDDConfigurationTestData } from "./CDDConfigurationTestData.js";

const circular = {
    circular: null as unknown
};
circular.circular = circular;
const error = new Error("hello");
error.stack = "fake stacktrace";
export const SerializableTestDataDescriptor = {
    complexObject: {
        boolean: true,
        simpleString: "foo",
        complexString: "a \t \b \b \n \f \r \" \\ \\\\ ",
        yetAnotherComplexString: "\u0000-\u0009\u000b-\u001f",
        jsonable: {
            toJSON: () => "JSONABLE"
        },
        object: {
            "toJSON": "not a function"
        },
        simpleNumber: 3,
        infinity: 1 / 0,
        null: null,
        arraywithEmpty: [undefined,undefined]
    },
    circular,
    objectWithFunctions: {
        a: "foo",
        b: () => {
            const egy = 1;
            return String(egy);
        },
        c: annotateFunction(() => String(1))
    },
    error,
    empty: {},
    config: configFromFile,
    defaultConfig,
    contractEntity: new ContractEntity(),
    argparser: argparser.options.map(desc=> desc.description+" "+ desc.flags).slice(0,8),
    defaultargv: mkargv(CDDConfigurationTestData.defaultConfig())
};
export type SerializableTestdata = {
    [K in keyof typeof SerializableTestDataDescriptor]: () => typeof SerializableTestDataDescriptor[K];
};

export const SerializableTestData:SerializableTestdata = (() => {
    const ret:Record<string,unknown> = {}
    for( const k in SerializableTestDataDescriptor) {
        ret[k] = () => (SerializableTestDataDescriptor as Record<string,unknown>)[k]
    }
    return ret
})() as SerializableTestdata
