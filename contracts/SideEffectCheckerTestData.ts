import { SideEffectChecker } from "src/contract/SideEffectChecker";
import { SeChecker } from "test/SeChecker";

export function getSideEffectChecker():[string, SideEffectChecker<(arg: number, arg2: string) => string>] {
    return [
        "logs to console",
        new SeChecker([["hello a"]])];
}

export function getSideEffectCheckerFailing():[string, SideEffectChecker<(arg: number, arg2: string) => string>] {
    return [
        "failing sideEffectCheck",
        new SeChecker([["these are not the droids you are looking for"]])]
}
