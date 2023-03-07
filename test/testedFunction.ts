import { GlobalObject } from "./SeChecker";

export function testedFunction(arg: number, arg2: string) {
    if(arg==2)
    throw new Error("first arg cannot be two")
    if(arg!=3)
        GlobalObject.field.push(["hello " + arg2]);
    return String(arg);
}
