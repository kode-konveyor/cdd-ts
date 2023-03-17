import { GLobalObject } from "../SideEffectChecker/SeChecker";

export function getEnvironmentManipulatorThrice(): { setUp: () => void; tearDown: () => void; } {
    return {
        setUp: () => { GLobalObject.multiplier = 3; },
        tearDown: () => { GLobalObject.multiplier = 1; }
    };
}
