import { GLobalObject } from "./SideEffectCheckerTestData.js";

export type TestedFunctionType = (arg: number, arg2: string) => string;

export const EXCEPTION_THROWN = "first arg cannot be two";
function testedFunctionWithGlobal(arg: number, arg2: string): string {
    if (arg === 2)
        throw new Error(EXCEPTION_THROWN)
    if (arg === 3) {
        GLobalObject.value.push(["hello " + arg2]);
    }
    return String(arg * GLobalObject.multiplier);
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