import { MethodType } from "../types/MethodType.js";

export function checkThrow<T extends MethodType>(funktion: T, params: Parameters<T>, matchString: string): unknown {
    try {
        funktion(...params);
        throw new Error("no exception was thrown");
    } catch (catched) {
        if (String(catched).match(matchString) != null)
            return undefined
        throw catched;
    }
}
export async function checkThrowAsync<T extends MethodType>(funktion: T, params: Parameters<T>, matchString: string): Promise<number> {
    try {
        await funktion(...params);
        throw new Error("no exception was thrown");
    } catch (catched) {
        if (String(catched).match(matchString) != null)
            return 1
        throw catched;
    }
}
