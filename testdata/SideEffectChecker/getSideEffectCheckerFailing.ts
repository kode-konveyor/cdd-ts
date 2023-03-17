import { SideEffectCheckerType } from "../../src/types/SideEffectChecker";
import { SeChecker } from "./SeChecker";

export function getSideEffectCheckerFailing(): SideEffectCheckerType {
    return new SeChecker([["these are not the droids you are looking for"]]);
}
