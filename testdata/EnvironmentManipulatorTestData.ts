import { GLobalObject } from "./SideEffectCheckerTestData.js";

export const EnvironmentmanipulatortestData =  {
    thrice: () => {
        return {
            setUp: () => { GLobalObject.multiplier = 3; },
            tearDown: () => { GLobalObject.multiplier = 1; }
        };
    }
}