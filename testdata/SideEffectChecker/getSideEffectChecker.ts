import { SideEffectCheckerType } from "../../src/types/SideEffectChecker";
import { SeChecker } from "./SeChecker";

export function getSideEffectChecker(): SideEffectCheckerType {
    return new SeChecker([["hello b"]]);
}
