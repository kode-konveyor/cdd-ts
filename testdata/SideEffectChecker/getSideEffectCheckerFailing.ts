import { SideEffectCheckerType } from "../../src/types/SideEffectChecker";
import { getSideEffectChecker } from "./getSideEffectChecker";
import { SeChecker } from "./SeChecker";

export function getSideEffectCheckerFailing(): SideEffectCheckerType {
    const sideEffectChecker = getSideEffectChecker() as SeChecker
    sideEffectChecker.expected = [["these are not the droids you are looking for"]];
    return sideEffectChecker
}
