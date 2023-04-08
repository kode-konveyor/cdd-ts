import { Mutex } from "../src/util/Mutex.js";
import { GlobalObject } from "./SideEffectCheckerTestData.js";

export type TestedFunctionType = (arg: number, arg2: string) => string;

export const EXCEPTION_THROWN = "first arg cannot be two";

const mutex = new Mutex()

async function testedFunctionWithGlobal(arg: number, arg2: string): Promise<string> {
   const unlock = await mutex.lock()
    unlock()
    if (arg === 2)
        throw new Error(EXCEPTION_THROWN)
    if (arg === 3) {
        GlobalObject.value.push(["hello " + arg2]);
    }
    return String(arg * GlobalObject.multiplier);
}

function testedFunction(arg: number, arg2: string): string {
    if (arg === 2)
        throw new Error(EXCEPTION_THROWN)
    return String(arg);
}


export const TestedFunctionTestData = {
    default: () => testedFunction,
    withGlobal: () => testedFunctionWithGlobal
}