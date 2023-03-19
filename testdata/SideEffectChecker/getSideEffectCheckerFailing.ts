import { SideEffectCheckerType } from "../../src/types/SideEffectChecker.js";
import { getSideEffectChecker } from "./getSideEffectChecker.js";
import { SeChecker } from "./SeChecker.js";

export function getSideEffectCheckerFailing(): SideEffectCheckerType {
    const sideEffectChecker = getSideEffectChecker() as SeChecker
    sideEffectChecker.expected = [["these are not the droids you are looking for"]];
    return sideEffectChecker
}
