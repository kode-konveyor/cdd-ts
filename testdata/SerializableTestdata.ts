import { annotateFunction } from "../src/util/annotateFunction.js";

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
        null: null
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
    empty: {}
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
