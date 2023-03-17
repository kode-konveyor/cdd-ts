import { GLobalObject } from "../SideEffectChecker/SeChecker";
import { TestedFunctionType } from "./TestedFunctionType";

function testedFunction(arg: number, arg2: string): string {
    if (arg === 2)
        throw new Error("first arg cannot be two")
    if (arg !== 3)
        GLobalObject.value.push(["hello " + arg2]);
    return String(arg * GLobalObject.multiplier);
}

export function getMethod():TestedFunctionType {
    return testedFunction
}