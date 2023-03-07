import { GLobalObject } from "./SeChecker";

export function testedFunction(arg: number, arg2: string) {
    if(arg==2)
    throw new Error("first arg cannot be two")
    if(arg!=3)
        GLobalObject.value.push(["hello " + arg2]);
    return String(arg);
}
