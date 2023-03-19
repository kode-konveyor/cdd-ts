import { SideEffectCheckerType } from "../../src/types/SideEffectChecker.js";
import { SeChecker } from "./SeChecker.js";

export function getSideEffectChecker(): SideEffectCheckerType {
    return new SeChecker();
}
