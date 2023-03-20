import { annotateFunction } from "./annotateFunction.js";
import { messageFormat } from "./messageFormat.js";

export type TestDataDEscriptor<T extends unknown> = Record<string,Partial<T> & {__from: string}>

export function makeTestData<T extends unknown>(descriptor: TestDataDEscriptor<T>, constructor: () => T): Record<string, () => T> {
    const ret: Record<string, () => T> = {};
    for(const key in descriptor) {
        ret[key] = annotateFunction(constructor)
        let data:T;
        if(descriptor[key].__from === "")
            data = constructor()
        else
            try {
            data = ret[descriptor[key].__from]()
            } catch {
                throw new Error(messageFormat("No such testdata found: {1} did you reference a later item in __from?", descriptor[key].__from))
            }
        for(const field in descriptor[key]) {
            if(field !== "__from")
            (data as Record<string, unknown>)[field] = (descriptor[key] as Record<string,unknown>)[field]
        }
        ret[key] = annotateFunction(() => data)
    }
    return ret;
}


