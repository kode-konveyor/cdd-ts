import { SideEffectChecker } from "../src/contract/SideEffectChecker";
import { SeChecker } from "../test/SeChecker";

export function getSideEffectChecker():[string, SideEffectChecker] {
    return [
        "logs to console",
        new SeChecker([["hello a"]])];
}

export function getSideEffectCheckerFailing():[string, SideEffectChecker] {
    return [
        "failing sideEffectCheck",
        new SeChecker([["these are not the droids you are looking for"]])]
}
