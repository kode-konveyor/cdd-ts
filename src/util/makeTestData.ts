import { annotateFunction } from "./annotateFunction.js";
import { deepCopy } from "./deepCopy.js";
import { messageFormat } from "./messageFormat.js";

export type DescriptorAddType = [string, string, unknown];

interface Descriptorfields {
    __from: string;
    __add?: DescriptorAddType;
};

export type TestDataDescriptor<T extends unknown> = Record<string,Partial<T> & Descriptorfields>

export type TestData<T extends unknown, D extends TestDataDescriptor<T>> = Record< keyof D, () => T>

export function makeTestData<T extends unknown, K extends TestDataDescriptor<T>>(descriptor: K, constructor?: () => T): TestData<T,K> {
    const ret: Record<string, () => T> = {};
    if(constructor === undefined) {
        constructor = (() => {return {}}) as unknown as () => T
    }
    for(const key in descriptor) {
        let data:T;
        if(descriptor[key] === undefined)
            throw Error("should not happen")
        if((descriptor[key] as Descriptorfields).__from === "")
            data = constructor()
        else {
            if(ret[descriptor[key].__from] === undefined)
                throw new Error(messageFormat("No such testdata found: {1} did you reference a later item in __from?", descriptor[key].__from))
            data = ret[descriptor[key].__from]()
        }
        for(const field in descriptor[key]) {
            if(field === "__add") {
                const [foo,bar,baz] = (descriptor[key] as Record<string,[string,string,unknown]>)[field];
                (data as Record<string, Record<string,unknown>>)[foo][bar] = baz
            } else if(field !== "__from")
            (data as Record<string, unknown>)[field] = (descriptor[key] as Record<string,unknown>)[field]
        }
        ret[key] = annotateFunction(() => deepCopy(data))
    }
    return ret as TestData<T,K>;
}


